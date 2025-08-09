import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mail, Phone, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface CustomerInquiry {
  id: string;
  contact_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  message: string;
  product_id?: string;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  subject?: string | null;
  inquiry_type?: string | null;
  budget_range?: string | null;
  company_size?: string | null;
  country?: string | null;
  timeline?: string | null;
  priority?: string | null;
  assigned_to?: string | null;
  follow_up_date?: string | null;
  notes?: string | null;
}

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching inquiries:', error);
        return;
      }

      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('customer_inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating inquiry:', error);
        return;
      }

      // Update local state
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status, updated_at: new Date().toISOString() } : inquiry
        )
      );
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const getStatusBadge = (status: string | null) => {
    const statusConfig = {
      new: { color: 'bg-blue-500', text: 'New' },
      in_progress: { color: 'bg-yellow-500', text: 'In Progress' },
      completed: { color: 'bg-green-500', text: 'Completed' },
      archived: { color: 'bg-gray-500', text: 'Archived' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-500', text: 'Unknown' };
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Inquiries</h1>
            <p className="text-muted-foreground">
              Manage customer inquiries and support requests
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {inquiries.length} total inquiries
            </Badge>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Inquiries</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No inquiries found</p>
                    </div>
                  ) : (
                    inquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedInquiry?.id === inquiry.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                                                         <div className="flex items-center space-x-2 mb-2">
                               <h3 className="font-semibold text-foreground">
                                 {inquiry.contact_name}
                               </h3>
                               {getStatusBadge(inquiry.status)}
                             </div>
                             <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                               {inquiry.message}
                             </p>
                             <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                               <span className="flex items-center space-x-1">
                                 <Calendar className="h-3 w-3" />
                                 <span>{formatDate(inquiry.created_at)}</span>
                               </span>
                               {inquiry.company_name && (
                                 <span className="flex items-center space-x-1">
                                   <User className="h-3 w-3" />
                                   <span>{inquiry.company_name}</span>
                                 </span>
                               )}
                             </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Inquiry Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedInquiry ? (
                  <div className="space-y-4">
                                         <div>
                       <h3 className="font-semibold text-foreground mb-2">
                         {selectedInquiry.contact_name}
                       </h3>
                       <div className="space-y-2 text-sm">
                         <div className="flex items-center space-x-2">
                           <Mail className="h-4 w-4 text-muted-foreground" />
                           <span>{selectedInquiry.email}</span>
                         </div>
                         {selectedInquiry.phone && (
                           <div className="flex items-center space-x-2">
                             <Phone className="h-4 w-4 text-muted-foreground" />
                             <span>{selectedInquiry.phone}</span>
                           </div>
                         )}
                         {selectedInquiry.company_name && (
                           <div className="flex items-center space-x-2">
                             <User className="h-4 w-4 text-muted-foreground" />
                             <span>{selectedInquiry.company_name}</span>
                           </div>
                         )}
                       </div>
                     </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Message</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {(['new', 'in_progress', 'completed', 'archived'] as const).map((status) => (
                          <Button
                            key={status}
                            variant={selectedInquiry.status === status ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateInquiryStatus(selectedInquiry.id, status)}
                          >
                            {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Created: {formatDate(selectedInquiry.created_at)}</div>
                        <div>Updated: {formatDate(selectedInquiry.updated_at)}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select an inquiry to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 