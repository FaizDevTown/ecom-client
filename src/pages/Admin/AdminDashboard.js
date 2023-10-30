import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h3>Admin Dashboard</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="info-card">
                      <h4 className="mb-3">Admin Information</h4>
                      <p>
                        <strong>Name:</strong> {auth?.user?.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {auth?.user?.email}
                      </p>
                      <p>
                        <strong>Contact:</strong> {auth?.user?.phone}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="welcome-message">
                      <h4>Welcome, {auth?.user?.name}!</h4>
                      <p>
                        You have access to all the admin features and controls.
                        Manage your dashboard efficiently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
