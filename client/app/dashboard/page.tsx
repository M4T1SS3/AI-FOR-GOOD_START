import OrganDonationCRM from '@/components/dashboard/crm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organ Donation Management System | AI for Good',
  description: 'Streamlining the organ donation process with AI technology',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <OrganDonationCRM />
    </div>
  );
}
