import type {
  StatCard,
  ChartDataPoint,
  Project,
  Reminder,
  TeamMember,
  Highlight,
  AchievementYear,
  KanbanColumn,
  ChatMessage,
  CalendarEvent,
  ApiKey,
  User,
  Todo,
  Note,
  Order,
  Product,
  NavGroup,
  RecentProject,
  Transaction,
  Driver,
  AppUser,
} from "../Types/types";

// ── Navigation ───────────────────────────────────────────────
export const navGroups: NavGroup[] = [
  {
    title: "Dashboards",
    items: [
      { id: "das", label: "Dashboard", icon: "RiDashboardLine", path: "/project" },
      { id: "analytics", label: "Website Analytics", icon: "RiBarChartLine", path: "/analytics" },
      // { id: "project", label: "Project Management", icon: "RiFolderLine", path: "" },
      // { id: "crypto", label: "Cyripto", icon: "RiBitCoinLine", path: "/crypto" },
      // { id: "ecommerce", label: "E-commerce", icon: "RiShoppingBagLine", path: "/ecommerce" },
      // { id: "crm", label: "CRM", icon: "RiContactsLine", path: "/crm" },      
    ],
  },
  // {
  //   title: "Apps",
  //   items: [
  //     { id: "chats", label: "Chats", icon: "RiMessage2Line", path: "/chats" },
  //     { id: "mail", label: "Mail", icon: "RiMailLine", path: "/mail" },
  //     { id: "kanban", label: "Kanban", icon: "RiLayoutLine", path: "/kanban" },
  //     { id: "todo", label: "Todo List", icon: "RiTodoLine", path: "/todo" },
  //     { id: "notes", label: "Notes", icon: "RiStickyNoteLine", path: "/notes" },
  //     { id: "calendar", label: "Calendar", icon: "RiCalendarLine", path: "/calendar" },
  //     { id: "apikeys", label: "Api Keys", icon: "RiKeyLine", path: "/api-keys" },
  //   ],
  // },


  {
    title: "Pages",
    items: [
        {
        id: "auth", label: "Management", icon: "RiShieldLine", path: "/auth",
        children: [
          { id: "partner-verify", label: "Partner-Verify-List", icon: "FaAddressCard", path: "/auth/verifypartner" },
          { id: "transaction-history", label: "Transaction-History", icon: "TbTransactionRupee", path: "/auth/transaction" },
          { id: "delivery-partner ", label: "Delivery-Partner", icon: "RiEBike2Fill", path: "/auth/partner" },

        ],
      },


      // { id: "profile", label: "Profile", icon: "RiUserLine", path: "/profile" },
      { id: "users", label: "Users", icon: "RiGroupLine", path: "/users" },
      {
        id: "orders", label: "Orders", icon: "RiShoppingCartLine", path: "/orders",
        children: [
          { id: "orders-list", label: "Order List", icon: "RiListCheck", path: "/orders/list" },
          { id: "orders-detail", label: "Order Detail", icon: "RiFileList3Line", path: "/orders/detail" },
        ],
      },
      {
        id: "products", label: "Products", icon: "RiBox3Line", path: "/products",
        children: [
          { id: "products-list", label: "Product List", icon: "RiListCheck", path: "/products/list" },
          { id: "products-add", label: "Add Product", icon: "RiAddCircleLine", path: "/products/add" },
        ],
      },
      { id: "settings", label: "Settings", icon: "RiSettingsLine", path: "/settings" },

      // {
      //   id: "auth", label: "Authentication", icon: "RiShieldLine", path: "/auth",
      //   children: [
      //     { id: "auth-login", label: "Login", icon: "RiLoginBoxLine", path: "/auth/login" },
      //     { id: "auth-register", label: "Register", icon: "RiUserAddLine", path: "/auth/register" },
      //   ],
      // },
    ],
  },
];



// ── KPI Stat Cards ───────────────────────────────────────────
export const statCards: StatCard[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "₹45,231.89",
    change: "+20.1% from last month",
    changeType: "positive",
    icon: "GiMoneyStack",
  },
  {
    id: "orders",
    title: "Orders",
    value: "1,423",
    change: "+5.02% from last month",
    changeType: "positive",
    icon: "FaBoxOpen",
  },
  {
    id: "Active Deliveries",
    title: "Active Deliveries",
    value: "3,423",
    change: "-3.58% from last month",
    changeType: "negative",
    icon: "FaTruckMoving",
  },
  {
    id: "Pending Orders",
    title: "Pending Orders",
    value: "150",
    change: "+10.35% from last month",
    changeType: "positive",
    icon: "MdOutlinePendingActions",
  },

   {
    id: "Total Drivers",
    title: "Total Drivers",
    value: "69",
    change: "+6.35% from last month",
    changeType: "positive",
    icon: "MdOutlinePendingActions",
  },
];




export const DriverstatCards: StatCard[] = [
  {
    id: "Driver",
    title: "Total Driver's",
    value: "35,567",
    change: "+20.1% from last month",
    changeType: "positive",
    icon: "FaTruckMoving",
  },
  {
    id: "Active Driver",
    title: "Active Driver's",
    value: "1,423",
    change: "+5.02% from last month",
    changeType: "positive",
    icon: "MdOutlineDirectionsBike",
  },
  {
    id: "In-Active Driver's",
    title: "In-Active Driver's",
    value: "3,423",
    change: "-3.58% from last month",
    changeType: "negative",
    icon: "MdOutlineAirplanemodeInactive",
  },
  {
    id: "Block",
    title: "Blocked Driver's",
    value: "150",
    change: "+10.35% from last month",
    changeType: "positive",
    icon: "MdOutlinePendingActions",
  },

];






export const PartnerStatsCards: StatCard[] = [
  {
    id: "Driver",
    title: "Total Verify Partner's",
    value: "13,367",
    change: "+20.1% from last month",
    changeType: "positive",
    icon: "FaTruckMoving",
  },
  {
    id: "Pending Partner's",
    title: "Pending Partner's",
    value: "1,423",
    change: "-5.02% from last month",
    changeType: "negative",
    icon: "MdOutlineDirectionsBike",
  },
  {
    id: " cancel",
    title: "Canceled Partner's",
    value: "3,423",
    change: "-3.58% from last month",
    changeType: "negative",
    icon: "MdOutlineAirplanemodeInactive",
  },
  {
    id: "Block",
    title: "Blocked Partner's",
    value: "150",
    change: "+10.35% from last month",
    changeType: "positive",
    icon: "MdOutlinePendingActions",
  },

];





export const UsersStatsCards: StatCard[] = [
  {
    id: "Users",
    title: "Total Users",
    value: "13,367",
    change: "+20.1% from last month",
    changeType: "positive",
    icon: "HiUserGroup",
  },
  {
    id: "Active User's",
    title: "Active User's",
    value: "1,423",
    change: "-5.02% from last month",
    changeType: "negative",
    icon: "RiUserLocationLine",
  },
  {
    id: "In-Active User's",
    title: "In-Active User's",
    value: "3,423",
    change: "-3.58% from last month",
    changeType: "negative",
    icon: "MdOutlineAirplanemodeInactive",
  },
  {
    id: "Block",
    title: "Blocked User's",
    value: "150",
    change: "+10.35% from last month",
    changeType: "positive",
    icon: "MdOutlinePendingActions",
  },

];




export const AnalyticsStatsCards: StatCard[] = [
  {
    id: "Users",
    title: "Daily active users",
    value: "13,367",
    change: "+20.1% from last month",
    changeType: "positive",
    icon: "HiUserGroup",
  },
  {
    id: "Weekly sessions",
    title: "Weekly sessions",
    value: "1,423",
    change: "-5.02% from last month",
    changeType: "negative",
    icon: "SiSessionize",
  },
  {
    id: "Duration",
    title: "Duration",
    value: "5.2 mins",
    change: "-3.58% from last month",
    changeType: "negative",
    icon: "GiDuration",
  },
  {
    id: "Conversion Rate",
    title: "Conversion Rate",
    value: "15%",
    change: "+10.35% from last month",
    changeType: "positive",
    icon: "GiRugbyConversion",
  },

];






// ── Chart Data ────────────────────────────────────────────────
export const chartData: ChartDataPoint[] = [
  { date: "Jun 18", mobile: 65, desktop: 88 },
  { date: "Jun 19", mobile: 72, desktop: 95 },
  { date: "Jun 20", mobile: 58, desktop: 70 },
  { date: "Jun 21", mobile: 120, desktop: 145 },
  { date: "Jun 22", mobile: 95, desktop: 110 },
  { date: "Jun 23", mobile: 148, desktop: 162 },
  { date: "Jun 24", mobile: 138, desktop: 132 },
  { date: "Jun 25", mobile: 85, desktop: 98 },
  { date: "Jun 26", mobile: 110, desktop: 125 },
  { date: "Jun 27", mobile: 78, desktop: 92 },
  { date: "Jun 28", mobile: 130, desktop: 115 },
  { date: "Jun 29", mobile: 155, desktop: 140 },
  { date: "Jun 30", mobile: 142, desktop: 158 },
];

// ── Team Members ─────────────────────────────────────────────
export const teamMembers: TeamMember[] = [
  { id: "1", name: "Alice Johnson", avatar: "https://i.pravatar.cc/40?img=1", role: "Designer", status: "online" },
  { id: "2", name: "Bob Smith", avatar: "https://i.pravatar.cc/40?img=2", role: "Developer", status: "busy" },
  { id: "3", name: "Carol White", avatar: "https://i.pravatar.cc/40?img=3", role: "Manager", status: "online" },
  { id: "4", name: "David Lee", avatar: "https://i.pravatar.cc/40?img=4", role: "Analyst", status: "offline" },
  { id: "5", name: "Eva Brown", avatar: "https://i.pravatar.cc/40?img=5", role: "QA Lead", status: "online" },
];

// ── Highlights ───────────────────────────────────────────────
export const highlights: Highlight[] = [
  { id: "1", label: "Avg. Client Rating", value: "7.8 / 10", trend: "up" },
  { id: "2", label: "Avg. Agent Rating", value: "4.8 / 10", trend: "down" },
  { id: "3", label: "Avg. Agent Earnings", value: "$2,309", trend: "up" },
];

// ── Achievement Data ─────────────────────────────────────────
export const achievementData: AchievementYear[] = [
  { year: 2024, projects: 57, barWidth: 100 },
  { year: 2023, projects: 29, barWidth: 51 },
  { year: 2022, projects: 35, barWidth: 61 },
];

// ── Reminders ────────────────────────────────────────────────
export const reminders: Reminder[] = [
  {
    id: "1",
    title: "Create a design training for beginners.",
    time: "Today, 12:30",
    priority: "low",
    type: "Training",
  },
  {
    id: "2",
    title: "Have a meeting with the new design team.",
    time: "Today, 10:00",
    priority: "medium",
    type: "Meeting",
  },
  {
    id: "3",
    title: "Respond to customer support emails.",
    time: "Tomorrow, 16:30",
    priority: "high",
    type: "Email",
  },
  {
    id: "4",
    title: "Review pull requests from dev team.",
    time: "Tomorrow, 09:00",
    priority: "medium",
    type: "Review",
  },
  {
    id: "5",
    title: "Prepare Q3 performance report.",
    time: "Fri, 15:00",
    priority: "high",
    type: "Report",
  },
];

// ── Projects ─────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "1", name: "Brand Redesign", status: "active", progress: 72,
    dueDate: "Oct 15, 2024", assignees: ["https://i.pravatar.cc/30?img=1", "https://i.pravatar.cc/30?img=2"],
    priority: "high",
  },
  {
    id: "2", name: "Mobile App v2", status: "active", progress: 45,
    dueDate: "Nov 01, 2024", assignees: ["https://i.pravatar.cc/30?img=3", "https://i.pravatar.cc/30?img=4"],
    priority: "medium",
  },
  {
    id: "3", name: "API Integration", status: "on-hold", progress: 28,
    dueDate: "Oct 28, 2024", assignees: ["https://i.pravatar.cc/30?img=5"],
    priority: "low",
  },
  {
    id: "4", name: "Data Dashboard", status: "completed", progress: 100,
    dueDate: "Sep 30, 2024", assignees: ["https://i.pravatar.cc/30?img=6", "https://i.pravatar.cc/30?img=7"],
    priority: "high",
  },
];

// ── Kanban ───────────────────────────────────────────────────
export const kanbanColumns: KanbanColumn[] = [
  {
    id: "todo", title: "To Do", color: "#6366f1",
    cards: [
      { id: "k1", title: "Setup CI/CD pipeline", description: "Configure GitHub Actions for automated deployments", priority: "high", assignee: "https://i.pravatar.cc/32?img=1", dueDate: "Oct 20", tags: ["DevOps"] },
      { id: "k2", title: "Write unit tests", description: "Cover core business logic with Jest tests", priority: "medium", assignee: "https://i.pravatar.cc/32?img=2", dueDate: "Oct 22", tags: ["Testing"] },
    ],
  },
  {
    id: "inprogress", title: "In Progress", color: "#f59e0b",
    cards: [
      { id: "k3", title: "Design system audit", description: "Review all components against new brand guidelines", priority: "high", assignee: "https://i.pravatar.cc/32?img=3", dueDate: "Oct 18", tags: ["Design"] },
      { id: "k4", title: "API documentation", description: "Document all REST endpoints with Swagger", priority: "low", assignee: "https://i.pravatar.cc/32?img=4", dueDate: "Oct 25", tags: ["Docs"] },
    ],
  },
  {
    id: "review", title: "In Review", color: "#8b5cf6",
    cards: [
      { id: "k5", title: "Landing page redesign", description: "New hero section and pricing page layout", priority: "medium", assignee: "https://i.pravatar.cc/32?img=5", dueDate: "Oct 15", tags: ["Design", "Frontend"] },
    ],
  },
  {
    id: "done", title: "Done", color: "#10b981",
    cards: [
      { id: "k6", title: "User auth flow", description: "OAuth2 with Google and GitHub providers", priority: "high", assignee: "https://i.pravatar.cc/32?img=6", dueDate: "Oct 10", tags: ["Auth"] },
      { id: "k7", title: "Database schema v2", description: "Normalized schema with proper indexes", priority: "medium", assignee: "https://i.pravatar.cc/32?img=7", dueDate: "Oct 08", tags: ["Backend"] },
    ],
  },
];

// ── Chat Messages ─────────────────────────────────────────────
export const chatMessages: ChatMessage[] = [
  { id: "1", sender: "Alice Johnson", avatar: "https://i.pravatar.cc/40?img=1", message: "Hey, are you free for a quick call?", time: "2m ago", unread: 3, online: true },
  { id: "2", sender: "Bob Smith", avatar: "https://i.pravatar.cc/40?img=2", message: "The new designs look amazing! 🎉", time: "15m ago", unread: 1, online: true },
  { id: "3", sender: "Carol White", avatar: "https://i.pravatar.cc/40?img=3", message: "Can you review the PR when you get a chance?", time: "1h ago", online: false },
  { id: "4", sender: "David Lee", avatar: "https://i.pravatar.cc/40?img=4", message: "Meeting at 3pm confirmed.", time: "2h ago", online: true },
  { id: "5", sender: "Eva Brown", avatar: "https://i.pravatar.cc/40?img=5", message: "I've sent the report to your email.", time: "3h ago", online: false },
  { id: "6", sender: "Frank Miller", avatar: "https://i.pravatar.cc/40?img=6", message: "Thanks for your help yesterday!", time: "5h ago", online: true },
];

// ── Calendar Events ───────────────────────────────────────────
export const calendarEvents: CalendarEvent[] = [
  { id: "1", title: "Team Standup", date: "2024-10-14", time: "09:00", type: "meeting", color: "#6366f1" },
  { id: "2", title: "Design Review", date: "2024-10-14", time: "11:00", type: "event", color: "#f59e0b" },
  { id: "3", title: "Project Deadline", date: "2024-10-15", time: "18:00", type: "deadline", color: "#ef4444" },
  { id: "4", title: "Client Demo", date: "2024-10-16", time: "14:00", type: "meeting", color: "#6366f1" },
  { id: "5", title: "Sprint Planning", date: "2024-10-17", time: "10:00", type: "event", color: "#10b981" },
  { id: "6", title: "Code Review", date: "2024-10-18", time: "15:00", type: "reminder", color: "#8b5cf6" },
];

// ── API Keys ──────────────────────────────────────────────────
export const apiKeys: ApiKey[] = [
  { id: "1", name: "Production API", key: "sk-prod-****-****-****-xxxx", created: "Sep 01, 2024", lastUsed: "Today", status: "active" },
  { id: "2", name: "Development API", key: "sk-dev-****-****-****-yyyy", created: "Aug 15, 2024", lastUsed: "Yesterday", status: "active" },
  { id: "3", name: "Analytics Key", key: "sk-anl-****-****-****-zzzz", created: "Jul 20, 2024", lastUsed: "5 days ago", status: "inactive" },
  { id: "4", name: "Mobile SDK", key: "sk-mob-****-****-****-aaaa", created: "Oct 01, 2024", lastUsed: "2 hours ago", status: "active" },
];

// ── Users ─────────────────────────────────────────────────────
export const users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", avatar: "https://i.pravatar.cc/40?img=1", status: "active", joined: "Jan 10, 2024" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Developer", avatar: "https://i.pravatar.cc/40?img=2", status: "active", joined: "Feb 14, 2024" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Designer", avatar: "https://i.pravatar.cc/40?img=3", status: "pending", joined: "Mar 22, 2024" },
  { id: "4", name: "David Lee", email: "david@example.com", role: "Analyst", avatar: "https://i.pravatar.cc/40?img=4", status: "inactive", joined: "Apr 05, 2024" },
  { id: "5", name: "Eva Brown", email: "eva@example.com", role: "Manager", avatar: "https://i.pravatar.cc/40?img=5", status: "active", joined: "May 18, 2024" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", role: "Developer", avatar: "https://i.pravatar.cc/40?img=6", status: "active", joined: "Jun 30, 2024" },
];

// ── Todos ─────────────────────────────────────────────────────
export const todos: Todo[] = [
  { id: "1", title: "Complete dashboard design", completed: true, priority: "high", dueDate: "Oct 14", category: "Design" },
  { id: "2", title: "Write API documentation", completed: false, priority: "medium", dueDate: "Oct 16", category: "Docs" },
  { id: "3", title: "Fix login page bug", completed: false, priority: "high", dueDate: "Oct 15", category: "Dev" },
  { id: "4", title: "Review pull requests", completed: true, priority: "medium", dueDate: "Oct 13", category: "Review" },
  { id: "5", title: "Update dependencies", completed: false, priority: "low", dueDate: "Oct 20", category: "Maintenance" },
  { id: "6", title: "Prepare sprint report", completed: false, priority: "high", dueDate: "Oct 17", category: "Management" },
];

// ── Notes ─────────────────────────────────────────────────────
export const notes: Note[] = [
  { id: "1", title: "Project Ideas", content: "Explore micro-frontend architecture for the next major release. Consider using Module Federation.", color: "#fef3c7", createdAt: "Oct 10, 2024", tags: ["Ideas", "Architecture"] },
  { id: "2", title: "Meeting Notes", content: "Q3 retrospective: team performance was excellent. Focus on reducing tech debt in Q4.", color: "#dbeafe", createdAt: "Oct 12, 2024", tags: ["Meeting"] },
  { id: "3", title: "Bug Tracking", content: "Auth flow breaks when Google token expires. Need to implement silent refresh.", color: "#fce7f3", createdAt: "Oct 13, 2024", tags: ["Bug", "Auth"] },
  { id: "4", title: "Design Tokens", content: "Finalize color palette and typography scale before dev handoff. Use 8pt grid system.", color: "#d1fae5", createdAt: "Oct 11, 2024", tags: ["Design"] },
];

// ── Orders ────────────────────────────────────────────────────
export const orders: Order[] = [
  { id: "#ORD-001", customer: "Alice Johnson", product: "Pro Plan", amount: "$299.00", status: "delivered", date: "Oct 10, 2024" },
  { id: "#ORD-002", customer: "Bob Smith", product: "Enterprise Plan", amount: "$999.00", status: "processing", date: "Oct 12, 2024" },
  { id: "#ORD-003", customer: "Carol White", product: "Starter Plan", amount: "$49.00", status: "pending", date: "Oct 13, 2024" },
  { id: "#ORD-004", customer: "David Lee", product: "Pro Plan", amount: "$299.00", status: "shipped", date: "Oct 09, 2024" },
  { id: "#ORD-005", customer: "Eva Brown", product: "Enterprise Plan", amount: "$999.00", status: "cancelled", date: "Oct 08, 2024" },
  { id: "#ORD-006", customer: "Frank Miller", product: "Starter Plan", amount: "$49.00", status: "delivered", date: "Oct 07, 2024" },
];

// ── Products ──────────────────────────────────────────────────
export const products: Product[] = [
  { id: "1", name: "UI Kit Pro", category: "Design", price: "$79.00", stock: 234, image: "https://picsum.photos/seed/p1/60/60", status: "in-stock" },
  { id: "2", name: "Dashboard Bundle", category: "Templates", price: "$149.00", stock: 12, image: "https://picsum.photos/seed/p2/60/60", status: "low-stock" },
  { id: "3", name: "Icon Pack 500", category: "Icons", price: "$29.00", stock: 0, image: "https://picsum.photos/seed/p3/60/60", status: "out-of-stock" },
  { id: "4", name: "Figma Components", category: "Design", price: "$59.00", stock: 87, image: "https://picsum.photos/seed/p4/60/60", status: "in-stock" },
  { id: "5", name: "Analytics Template", category: "Templates", price: "$99.00", stock: 3, image: "https://picsum.photos/seed/p5/60/60", status: "low-stock" },
];



// anylysis data
export const trafficSources:any = [
  { source: "Organic", value: 42 }, { source: "Direct", value: 28 },
  { source: "Referral", value: 18 }, { source: "Social", value: 12 },
];

export const visitData:any = [
  { month: "Jan", visits: 4200 }, { month: "Feb", visits: 5800 },
  { month: "Mar", visits: 4900 }, { month: "Apr", visits: 7200 },
  { month: "May", visits: 6100 }, { month: "Jun", visits: 8900 },
  { month: "Jul", visits: 7400 }, { month: "Aug", visits: 9800 },
  { month: "Sep", visits: 8600 }, { month: "Oct", visits: 11200 },
];


export const mockProjects: RecentProject[] = [
  { id: "1", orderId: "#201238", clientName: "Sagar Jadhav", deliveryPartner: "Rahul Jagtap", startDate: "17 July 2024", deadline: "17 July 2026", transactionOk: true },
  { id: "2", orderId: "#201239", clientName: "Amit Sharma", deliveryPartner: "Priya Nair", startDate: "18 July 2024", deadline: "18 July 2026", transactionOk: false },
  { id: "3", orderId: "#201240", clientName: "Neha Kulkarni", deliveryPartner: "Rohan Mehta", startDate: "19 July 2024", deadline: "19 July 2026", transactionOk: true },
  { id: "4", orderId: "#201241", clientName: "Vijay Patil", deliveryPartner: "Sneha Desai", startDate: "20 July 2024", deadline: "20 July 2026", transactionOk: true },
  { id: "5", orderId: "#201242", clientName: "Kavya Reddy", deliveryPartner: "Arjun Singh", startDate: "21 July 2024", deadline: "21 July 2026", transactionOk: false },
  { id: "6", orderId: "#201243", clientName: "Raj Kumar", deliveryPartner: "Divya Rao", startDate: "22 July 2024", deadline: "22 July 2026", transactionOk: true },
];


export const DUMMY_TRANSACTIONS: Transaction[] = [
  { id: "1",  trackingId: "#201238", clientName: "Shreyash Jadhav", deliveryPartnerName: "Sanket Inamdar", dateTime: "2026-03-01T10:30:00Z", amount: 245, status: "pending"    },
  { id: "2",  trackingId: "#201239", clientName: "Ravi Kumar",      deliveryPartnerName: "Priya Sharma",   dateTime: "2026-03-01T11:00:00Z", amount: 180, status: "failed"     },
  { id: "3",  trackingId: "#201240", clientName: "Neha Patil",      deliveryPartnerName: "Rohit Desai",    dateTime: "2026-03-01T12:15:00Z", amount: 320, status: "processing" },
  { id: "4",  trackingId: "#201241", clientName: "Ajay Singh",      deliveryPartnerName: "Meena Joshi",    dateTime: "2026-03-02T09:00:00Z", amount: 150, status: "success"    },
  { id: "5",  trackingId: "#201242", clientName: "Priya Sharma",    deliveryPartnerName: "Vikram Rao",     dateTime: "2026-03-02T10:45:00Z", amount: 410, status: "pending"    },
  { id: "6",  trackingId: "#201243", clientName: "Kiran Nair",      deliveryPartnerName: "Sunita More",    dateTime: "2026-03-02T13:30:00Z", amount: 275, status: "success"    },
  { id: "7",  trackingId: "#201244", clientName: "Anjali Mehta",    deliveryPartnerName: "Ravi Kumar",     dateTime: "2026-03-03T08:20:00Z", amount: 195, status: "failed"     },
  { id: "8",  trackingId: "#201245", clientName: "Sanjay Gupta",    deliveryPartnerName: "Kiran Nair",     dateTime: "2026-03-03T14:10:00Z", amount: 560, status: "processing" },
  { id: "9",  trackingId: "#201246", clientName: "Deepak Verma",    deliveryPartnerName: "Anjali Mehta",   dateTime: "2026-03-04T09:50:00Z", amount: 390, status: "success"    },
  { id: "10", trackingId: "#201247", clientName: "Meena Joshi",     deliveryPartnerName: "Deepak Verma",   dateTime: "2026-03-04T11:25:00Z", amount: 220, status: "pending"    },
  { id: "11", trackingId: "#201248", clientName: "Rohit Desai",     deliveryPartnerName: "Ajay Singh",     dateTime: "2026-03-05T10:00:00Z", amount: 480, status: "success"    },
  { id: "12", trackingId: "#201249", clientName: "Sunita More",     deliveryPartnerName: "Neha Patil",     dateTime: "2026-03-05T15:40:00Z", amount: 310, status: "failed"     },
];






// ─── Dummy Data ───────────────────────────────────────────────────────────────

export const DRIVERS: Driver[] = [
  { id: "1",  name: "Suresh Kumar",  photo: "https://api.dicebear.com/7.x/personas/svg?seed=Suresh",  status: "On Route",  driverId: "DRV-001", phone: "+91 23456 78923", vehicle: "Tata Ace - MH 01 SB 3645", rating: 4.8, trips: 1240, earnings: "82K", location: "Andheri, Mumbai" },
  { id: "2",  name: "Ravi Sharma",   photo: "https://api.dicebear.com/7.x/personas/svg?seed=Ravi",    status: "Completed", driverId: "DRV-002", phone: "+91 23456 78924", vehicle: "Tata Ace - MH 02 AB 1234", rating: 4.6, trips: 980,  earnings: "68K", location: "Bandra, Mumbai" },
  { id: "3",  name: "Amit Patil",    photo: "https://api.dicebear.com/7.x/personas/svg?seed=Amit",    status: "Canceled",  driverId: "DRV-003", phone: "+91 23456 78925", vehicle: "Mahindra - MH 03 CD 5678", rating: 4.3, trips: 760,  earnings: "54K", location: "Dadar, Mumbai" },
  { id: "4",  name: "Vijay Nair",    photo: "https://api.dicebear.com/7.x/personas/svg?seed=Vijay",   status: "Completed", driverId: "DRV-004", phone: "+91 23456 78926", vehicle: "Tata Ace - MH 04 EF 9012", rating: 4.9, trips: 1560, earnings: "95K", location: "Powai, Mumbai" },
  { id: "5",  name: "Deepak Singh",  photo: "https://api.dicebear.com/7.x/personas/svg?seed=Deepak",  status: "Canceled",  driverId: "DRV-005", phone: "+91 23456 78927", vehicle: "Ashok Leyland - MH 05 GH", rating: 4.1, trips: 430,  earnings: "31K", location: "Kurla, Mumbai" },
  { id: "6",  name: "Manoj Desai",   photo: "https://api.dicebear.com/7.x/personas/svg?seed=Manoj",   status: "Completed", driverId: "DRV-006", phone: "+91 23456 78928", vehicle: "Tata Ace - MH 06 IJ 3456", rating: 4.7, trips: 1120, earnings: "79K", location: "Thane, Mumbai" },
  { id: "7",  name: "Rahul Verma",   photo: "https://api.dicebear.com/7.x/personas/svg?seed=Rahul",   status: "Completed", driverId: "DRV-007", phone: "+91 23456 78929", vehicle: "Maruti - MH 07 KL 7890",   rating: 4.5, trips: 890,  earnings: "62K", location: "Borivali, Mumbai" },
  { id: "8",  name: "Sanjay Joshi",  photo: "https://api.dicebear.com/7.x/personas/svg?seed=Sanjay",  status: "Canceled",  driverId: "DRV-008", phone: "+91 23456 78930", vehicle: "Tata Ace - MH 08 MN 2345", rating: 3.9, trips: 320,  earnings: "23K", location: "Malad, Mumbai" },
  { id: "9",  name: "Kiran Rao",     photo: "https://api.dicebear.com/7.x/personas/svg?seed=Kiran",   status: "Completed", driverId: "DRV-009", phone: "+91 23456 78931", vehicle: "Mahindra - MH 09 OP 6789", rating: 4.8, trips: 1380, earnings: "88K", location: "Goregaon, Mumbai" },
  { id: "10",  name: "Sanjay Joshi",  photo: "https://api.dicebear.com/7.x/personas/svg?seed=Sanjay",  status: "Canceled",  driverId: "DRV-008", phone: "+91 23456 78930", vehicle: "Tata Ace - MH 08 MN 2345", rating: 3.9, trips: 320,  earnings: "23K", location: "Malad, Mumbai" },
  { id: "11",  name: "Sanjay Joshi",  photo: "https://api.dicebear.com/7.x/personas/svg?seed=Sanjay",  status: "Canceled",  driverId: "DRV-008", phone: "+91 23456 78930", vehicle: "Tata Ace - MH 08 MN 2345", rating: 3.9, trips: 320,  earnings: "23K", location: "Malad, Mumbai" },
  { id: "12",  name: "Sanjay Joshi",  photo: "https://api.dicebear.com/7.x/personas/svg?seed=Sanjay",  status: "Canceled",  driverId: "DRV-008", phone: "+91 23456 78930", vehicle: "Tata Ace - MH 08 MN 2345", rating: 3.9, trips: 320,  earnings: "23K", location: "Malad, Mumbai" },

];




export const DUMMY_USERS: AppUser[] = [
  { id: "USR-001", name: "Shreyash Jadhav", email: "shreyash@example.com", phone: "+91 98765 43210", address: "Andheri, Mumbai, MH",   status: "Active",   joined: "2026-01-03T10:00:00Z" },
  { id: "USR-002", name: "Ravi Kumar",      email: "ravi@example.com",     phone: "+91 87654 32109", address: "Bandra, Mumbai, MH",     status: "Active",   joined: "2026-01-03T10:30:00Z" },
  { id: "USR-003", name: "Neha Patil",      email: "neha@example.com",     phone: "+91 76543 21098", address: "Dadar, Mumbai, MH", status: "Inactive", joined: "2026-01-03T11:45:00Z" },
  { id: "USR-004", name: "Ajay Singh",      email: "ajay@example.com",     phone: "+91 65432 10987", address: "Powai, Mumbai, MH",       status: "Active",   joined: "2026-02-03T14:30:00Z" },
  { id: "USR-005", name: "Priya Sharma",    email: "priya@example.com",    phone: "+91 54321 09876", address: "Kurla, Mumbai, MH",   status: "Active",   joined: "2026-02-03T16:15:00Z" },
  { id: "USR-006", name: "Kiran Nair",      email: "kiran@example.com",    phone: "+91 43210 98765", address: "Thane, Mumbai, MH",     status: "Banned",   joined: "2026-02-03T19:00:00Z" },
  { id: "USR-007", name: "Anjali Mehta",    email: "anjali@example.com",   phone: "+91 32109 87654", address: "Borivali, Mumbai, MH",    status: "Active",   joined: "2026-03-03T13:50:00Z" },
  { id: "USR-008", name: "Sanjay Gupta",    email: "sanjay@example.com",   phone: "+91 21098 76543", address: "Malad, Mumbai, MH",  status: "Active",   joined: "2026-03-04T09:10:00Z" },
  { id: "USR-009", name: "Deepak Verma",    email: "deepak@example.com",   phone: "+91 10987 65432", address: "Goregaon, Mumbai, MH",  status: "Inactive", joined: "2026-03-05T11:20:00Z" },
  { id: "USR-010", name: "Meena Joshi",     email: "meena@example.com",    phone: "+91 09876 54321", address: "Vile Parle, Mumbai",  status: "Active",   joined: "2026-03-06T08:45:00Z" },
  { id: "USR-011", name: "Vikram Rao",      email: "vikram@example.com",   phone: "+91 98760 43211", address: "Santacruz, Mumbai",    status: "Active",   joined: "2026-03-07T14:30:00Z" },
  { id: "USR-012", name: "Sunita More",     email: "sunita@example.com",   phone: "+91 87651 32100", address: "Jogeshwari, Mumbai",   status: "Banned",   joined: "2026-03-08T16:00:00Z" },
];