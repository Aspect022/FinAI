import { NextRequest, NextResponse } from 'next/server';

// Define the profile type
type Profile = {
  occupation: string;
  location: string;
  maritalStatus: string;
  dependents: string;
  financialGoals: string;
  investmentExperience: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
};

// GET handler - retrieve user profile
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would retrieve the user from auth session
    // For now, we'll simulate retrieving from a database
    const profile: Profile = {
      occupation: "Software Engineer",
      location: "Mumbai, Maharashtra",
      maritalStatus: "single",
      dependents: "0",
      financialGoals: "Retirement, House",
      investmentExperience: "intermediate",
      email: "user@example.com",
      phone: "+91 9876543210",
      emergencyContactName: "Jane Doe",
      emergencyContactPhone: "+91 9876543211",
    };

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT handler - update user profile
export async function PUT(request: NextRequest) {
  try {
    const body: Profile = await request.json();

    // In a real implementation, you would validate the user session
    // and update the profile in the database
    console.log('Updating profile:', body);

    // Validation
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // In a real implementation, you would save to a database
    // For now, we'll just return the submitted profile
    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: body 
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}