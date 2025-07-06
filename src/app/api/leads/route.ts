import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';

// Helper function to get the current user
async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }
  
  return prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const data = await request.json();
    const { id, ...leadData } = data;

    // If there's an ID, update the existing lead
    if (id) {
      const existingLead = await prisma.lead.findUnique({
        where: { id },
        select: { userId: true }
      });

      if (!existingLead) {
        return NextResponse.json(
          { error: 'Lead not found' },
          { status: 404 }
        );
      }

      if (existingLead.userId !== user.id) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }

      const updatedLead = await prisma.lead.update({
        where: { id },
        data: {
          ...leadData,
          userId: user.id,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updatedLead);
    }

    // Otherwise, create a new lead
    const newLead = await prisma.lead.create({
      data: {
        ...leadData,
        userId: user.id,
      },
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch leads for the current user
    const leads = await prisma.lead.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        status: true,
        source: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
        followUpOn: true,
      },
    });

    // Convert dates to ISO strings for JSON serialization
    const serializedLeads = leads.map(lead => ({
      ...lead,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
      followUpOn: lead.followUpOn?.toISOString() || null,
    }));

    return NextResponse.json(serializedLeads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Verify the lead exists and belongs to the user
    const lead = await prisma.lead.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    if (lead.userId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Delete the lead
    await prisma.lead.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Lead deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
