import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./Component/layouts/DashboardLayout";
import ProjectManagementPage from "./Pages/ProjectManagementPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import UsersPage from "./Pages/UsersPage";
import PartnerListTable from "./Pages/PartnerVerifylist";
import TransactionTable from "./Pages/TransactionPage";
import DeliveryPartnerPage from "./Pages/DriverListPage";
import ShipmentPage from "./Pages/ShipmentPage";
import PartnerDetailPage from "./Component/ui/DriverDetails";
// import DashboardLayout from "./DashboardLayout";
// import AnalyticsPage from "./components/ui/Analytics";
// import PlaceholderPage from "./components/ui/placeholderpage";
// import TodoPage from "./components/ui/TodoPage";
// import NotesPage from "./components/ui/notespage";
// import CalendarPage from "./components/ui/calenderPage";
// import ApiKeysPage from "./components/ui/Apikey";
// import ProfilePage from "./components/ui/profile";
// import UsersPage from "./components/ui/userpage";
// import SettingsPage from "./components/ui/setting";
// import OrdersPage from "./Pages/Orders";
// import ProductsPage from "./components/productpage";
// import MailPage from "./components/ui/mail";
// import ProjectManagementPage from "./components/ui/projectmanagementpage";
// import ChatsPage from "./components/ui/chatpage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        toastStyle={{ fontSize: 13 }}
      />
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* Redirect root to project management */}
          <Route index element={<Navigate to="/project" replace />} />

          {/* Dashboard routes */}
          <Route path="/project" element={<ProjectManagementPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          

          {/* App routes */}
          {/* <Route path="/chats" element={<ChatsPage />} />
          <Route path="/mail" element={<MailPage />} /> */}
          {/* <Route path="/kanban" element={<KanbanPage />} /> */}
          {/* <Route path="/todo" element={<TodoPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/api-keys" element={<ApiKeysPage />} /> */}

          {/* Page routes */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/orders/list" element={<ShipmentPage />} />
          <Route path="/orders/detail" element={<PartnerDetailPage />} />

 
          {/* <Route path="/settings" element={<SettingsPage />} />
          <Route path="/orders/list" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/list" element={<ProductsPage />} />
          <Route path="/products/add" element={<PlaceholderPage />} /> */}
          <Route path="/auth/verifypartner" element={<PartnerListTable />} />
          <Route path="/auth/transaction" element={<TransactionTable />} /> 
          <Route path="/auth/partner" element={<DeliveryPartnerPage />} /> 


          {/* Catch-all */}
          {/* <Route path="*" element={<PlaceholderPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;