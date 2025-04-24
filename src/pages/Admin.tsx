// src/pages/Admin.tsx

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Clock, Search, Calendar, Mail, Phone, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import AuthDialog from "@/components/AuthDialog";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

type Appointment = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  message: string | null;
  preferred_date: string;
  status: string;
  created_at: string;
};

const Admin = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
      setupRealtimeSubscription();
    }
  }, [isAuthenticated]);

  const setupRealtimeSubscription = () => {
    const subscription = supabase
      .channel('appointments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      console.log("Fetching appointments...");
      
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Fetched appointments:", data);
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      console.log("Updating appointment status:", { id, newStatus });
      
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("Update error:", error);
        throw error;
      }
      
      toast.success("Appointment status updated");
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment status");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dental-purple"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <Button onClick={() => setIsAuthDialogOpen(true)}>
            Login to Access Admin Dashboard
          </Button>
        </div>
        <AuthDialog 
          isOpen={isAuthDialogOpen} 
          onClose={() => setIsAuthDialogOpen(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/83a7815a-a265-4521-b0fc-e92f824f7141.png" 
                alt="Izmir Diş Estetiği" 
                className="h-10 w-auto" 
              />
              <h1 className="ml-4 text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/"}
              >
                Back to Website
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-2">
            <nav className="bg-white rounded-lg shadow-sm p-3">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/admin" 
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-sm",
                      location.pathname === "/admin" && "bg-gray-50 text-dental-purple"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    Appointments
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/blogs" 
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-sm",
                      location.pathname === "/admin/blogs" && "bg-gray-50 text-dental-purple"
                    )}
                  >
                    <BookOpen className="h-4 w-4" />
                    Manage Blogs
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-10">
            <div className="bg-white rounded-xl shadow-custom p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Appointments ({filteredAppointments.length})</h2>
                <Button onClick={fetchAppointments} size="sm">
                  Refresh
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Search by name, email, or phone"
                    className="pl-10 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dental-purple"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Patient</th>
                        <th className="text-left py-2 px-3">Contact</th>
                        <th className="text-left py-2 px-3">Service</th>
                        <th className="text-left py-2 px-3">Date</th>
                        <th className="text-left py-2 px-3">Status</th>
                        <th className="text-left py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-3">
                            <div className="flex items-center">
                              <div className="h-7 w-7 rounded-full bg-dental-purple/10 flex items-center justify-center mr-2">
                                <User className="h-3.5 w-3.5 text-dental-purple" />
                              </div>
                              <div>
                                <div className="font-medium">{appointment.full_name}</div>
                                <div className="text-xs text-gray-500">
                                  {new Date(appointment.created_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <Mail size={13} className="text-gray-500" />
                                <span>{appointment.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone size={13} className="text-gray-500" />
                                <span>{appointment.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-col">
                              <div className="font-medium">{appointment.service}</div>
                              {appointment.message && (
                                <div className="text-xs text-gray-500 mt-1 break-words whitespace-pre-wrap max-w-[300px]">
                                  {appointment.message}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1">
                              <Calendar size={13} className="text-gray-500" />
                              <span>{new Date(appointment.preferred_date).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            {getStatusBadge(appointment.status)}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex gap-2">
                              {appointment.status === "pending" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-green-600 border-green-600 hover:bg-green-50 text-xs"
                                    onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                                  >
                                    <CheckCircle size={13} className="mr-1" />
                                    Confirm
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-red-600 border-red-600 hover:bg-red-50 text-xs"
                                    onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                                  >
                                    <XCircle size={13} className="mr-1" />
                                    Cancel
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 