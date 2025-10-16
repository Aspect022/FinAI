// API utilities for user profile management

export type ProfileDetails = {
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

export async function getUserProfile(): Promise<ProfileDetails> {
  try {
    const response = await fetch('/api/profile');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data || {
      occupation: "",
      location: "",
      maritalStatus: "",
      dependents: "",
      financialGoals: "",
      investmentExperience: "",
      email: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Return default profile if API call fails
    return {
      occupation: "",
      location: "",
      maritalStatus: "",
      dependents: "",
      financialGoals: "",
      investmentExperience: "",
      email: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    };
  }
}

export async function updateUserProfile(profile: ProfileDetails): Promise<void> {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function getOnboardingDetails(): Promise<any> {
  // Get the basic onboarding details
  return {
    name: localStorage.getItem('name') || '',
    age: localStorage.getItem('age') || '',
    incomeType: localStorage.getItem('incomeType') || '',
    income: localStorage.getItem('income') || '',
    risk: localStorage.getItem('risk') || '',
  };
}