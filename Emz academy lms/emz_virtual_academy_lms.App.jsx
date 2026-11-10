import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Video, FileText, CheckCircle, Clock, Award, 
  User, Lock, LogOut, BarChart2, Shield, Plus, Key, 
  Download, Eye, Check, X, Search, ChevronRight, Menu, PlayCircle
} from 'lucide-react';

// Default initial state & dummy data
const INITIAL_COURSES = [
  {
    id: 'math-10',
    title: 'Mathematics - Class 10th',
    grade: '10th',
    subject: 'Math',
    icon: '📐',
    totalLectures: 24,
    lectures: [
      { id: 'l1', title: 'Chapter 1: Quadratic Equations - Part 1', duration: '45 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: true },
      { id: 'l2', title: 'Chapter 1: Quadratic Equations - Part 2', duration: '50 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: true },
      { id: 'l3', title: 'Chapter 2: Theory of Quadratic Equations', duration: '40 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: false },
      { id: 'l4', title: 'Chapter 3: Variations & Proportions', duration: '55 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: false }
    ],
    materials: [
      { id: 'm1', title: 'Ch 1 Formula Sheet & Notes.pdf', size: '2.4 MB', type: 'PDF' },
      { id: 'm2', title: 'Class 10 Math Past Papers (2018-2023).pdf', size: '5.1 MB', type: 'PDF' }
    ]
  },
  {
    id: 'phy-10',
    title: 'Physics - Class 10th',
    grade: '10th',
    subject: 'Physics',
    icon: '⚡',
    totalLectures: 20,
    lectures: [
      { id: 'pl1', title: 'Unit 10: Simple Harmonic Motion', duration: '38 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: true },
      { id: 'pl2', title: 'Unit 11: Sound Waves & Acoustics', duration: '42 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: false },
      { id: 'pl3', title: 'Unit 12: Geometrical Optics', duration: '48 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: false }
    ],
    materials: [
      { id: 'pm1', title: 'Physics Numericals Handout 2026.pdf', size: '3.8 MB', type: 'PDF' }
    ]
  },
  {
    id: 'chem-11',
    title: 'Chemistry - Class 11th',
    grade: '11th',
    subject: 'Chemistry',
    icon: '🧪',
    totalLectures: 28,
    lectures: [
      { id: 'cl1', title: 'Chapter 1: Stoichiometry & Moles', duration: '52 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: true },
      { id: 'cl2', title: 'Chapter 2: Atomic Structure', duration: '46 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: true },
      { id: 'cl3', title: 'Chapter 3: Chemical Bonding', duration: '50 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: true }
    ],
    materials: [
      { id: 'cm1', title: 'Organic Reaction Mechanisms Guide.pdf', size: '4.2 MB', type: 'PDF' }
    ]
  },
  {
    id: 'bio-12',
    title: 'Biology - Class 12th',
    grade: '12th',
    subject: 'Biology',
    icon: '🧬',
    totalLectures: 30,
    lectures: [
      { id: 'bl1', title: 'Chapter 15: Homeostasis Explained', duration: '44 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: false },
      { id: 'bl2', title: 'Chapter 16: Support and Movement', duration: '51 mins', driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', completed: false }
    ],
    materials: [
      { id: 'bm1', title: 'Class 12 Biology Diagrams Pack.pdf', size: '8.5 MB', type: 'PDF' }
    ]
  }
];

const DEFAULT_USERS = [
  {
    id: 'std-101',
    username: 'student1',
    password: '123',
    name: 'Muhammad Ali',
    grade: '10th',
    role: 'student',
    assignedCourses: ['math-10', 'phy-10'],
    weeklyHours: [2.5, 4.0, 3.2, 5.1, 4.5, 6.0, 3.8], // Mon-Sun
    totalLecturesCompleted: 3,
    totalHoursStudied: 14.5
  },
  {
    id: 'std-102',
    username: 'student2',
    password: '123',
    name: 'Fatima Fatima',
    grade: '11th',
    role: 'student',
    assignedCourses: ['chem-11'],
    weeklyHours: [3.0, 2.5, 4.2, 3.8, 5.0, 4.0, 2.0],
    totalLecturesCompleted: 3,
    totalHoursStudied: 24.5
  },
  {
    id: 'admin-1',
    username: 'admin',
    password: 'admin123',
    name: 'EMZ Admin / Faculty',
    role: 'admin'
  }
];

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('emz_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('emz_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Login Form States
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentUsername, setNewStudentUsername] = useState('');
  const [newStudentPass, setNewStudentPass] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('10th');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('emz_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('emz_courses', JSON.stringify(courses));
  }, [courses]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const userMatch = users.find(
      (u) => u.username.trim() === loginUser.trim() && u.password === loginPass
    );

    if (userMatch) {
      setCurrentUser(userMatch);
      setLoginError('');
      setActiveTab(userMatch.role === 'admin' ? 'admin' : 'dashboard');
    } else {
      setLoginError('Invalid Username or Password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCourse(null);
    setActiveVideo(null);
    setLoginUser('');
    setLoginPass('');
  };

  // Toggle Lecture Completed Status
  const toggleLectureCompleted = (courseId, lectureId) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            lectures: c.lectures.map((l) =>
              l.id === lectureId ? { ...l, completed: !l.completed } : l
            )
          };
        }
        return c;
      })
    );

    // Update user stats
    if (currentUser && currentUser.role === 'student') {
      setUsers((prevUsers) =>
        prevUsers.map((u) => {
          if (u.id === currentUser.id) {
            const updatedCompleted = Math.max(0, u.totalLecturesCompleted + 1);
            const updatedUser = {
              ...u,
              totalLecturesCompleted: updatedCompleted,
              totalHoursStudied: parseFloat((u.totalHoursStudied + 0.75).toFixed(1))
            };
            setCurrentUser(updatedUser);
            return updatedUser;
          }
          return u;
        })
      );
    }
  };

  // Admin: Assign / Unassign Course Access
  const toggleCourseAssignment = (studentId, courseId) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === studentId) {
          const hasCourse = u.assignedCourses.includes(courseId);
          const newAssigned = hasCourse
            ? u.assignedCourses.filter((id) => id !== courseId)
            : [...u.assignedCourses, courseId];

          return { ...u, assignedCourses: newAssigned };
        }
        return u;
      })
    );
  };

  // Admin: Register New Student
  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudentName || !newStudentUsername || !newStudentPass) return;

    const newStudent = {
      id: `std-${Date.now()}`,
      name: newStudentName,
      username: newStudentUsername,
      password: newStudentPass,
      grade: newStudentGrade,
      role: 'student',
      assignedCourses: [],
      weeklyHours: [0, 0, 0, 0, 0, 0, 0],
      totalLecturesCompleted: 0,
      totalHoursStudied: 0
    };

    setUsers([...users, newStudent]);
    setNewStudentName('');
    setNewStudentUsername('');
    setNewStudentPass('');
  };

  // Filtering user specific courses
  const userCourses = currentUser && currentUser.role === 'student'
    ? courses.filter((c) => currentUser.assignedCourses?.includes(c.id))
    : courses;

  // -------------------------------------------------------------
  // RENDER: LOGIN SCREEN
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00338D]/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00C4CC]/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00338D] to-[#00C4CC] shadow-lg shadow-[#00C4CC]/20 mb-4 text-white font-extrabold text-2xl">
              EMZ
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              EMZ Virtual Academy
            </h1>
            <p className="text-sm text-cyan-400 mt-1 font-medium">
              Student LMS & Portal Access
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Username / Student ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="e.g. student1 or admin"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-[#00C4CC] focus:ring-1 focus:ring-[#00C4CC] text-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-[#00C4CC] focus:ring-1 focus:ring-[#00C4CC] text-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00338D] to-[#00C4CC] hover:opacity-90 text-white font-semibold rounded-xl shadow-lg shadow-[#00338D]/40 transition transform active:scale-95 text-sm"
            >
              Sign In to Portal
            </button>
          </form>

          {/* Quick Demo Help Panel */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400">
            <p className="font-semibold text-slate-300 mb-2">Demo Logins:</p>
            <div className="space-y-1 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              <p><span className="text-cyan-400 font-mono">student1</span> / <span className="text-cyan-400 font-mono">123</span> (10th Grade Student)</p>
              <p><span className="text-cyan-400 font-mono">student2</span> / <span className="text-cyan-400 font-mono">123</span> (11th Grade Student)</p>
              <p><span className="text-cyan-400 font-mono">admin</span> / <span className="text-cyan-400 font-mono">admin123</span> (Academy Administrator)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN LMS APPLICATION SCREEN
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00338D] to-[#00C4CC] text-white font-bold flex items-center justify-center text-xs">
            EMZ
          </div>
          <span className="font-bold text-white text-sm">EMZ Virtual Academy</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-5 shrink-0 justify-between backdrop-blur-md`}>
        <div className="space-y-6">
          {/* Academy Brand Header */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00338D] to-[#00C4CC] text-white font-extrabold flex items-center justify-center text-base shadow-md shadow-[#00C4CC]/20">
              EMZ
            </div>
            <div>
              <h2 className="font-bold text-white leading-tight text-sm">EMZ Virtual Academy</h2>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">Virtual Portal</span>
            </div>
          </div>

          {/* User Badge */}
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00338D] text-[#00C4CC] font-bold flex items-center justify-center text-sm border border-[#00C4CC]/30">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                {currentUser.role === 'admin' ? 'Administrator' : `Class ${currentUser.grade}`}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {currentUser.role === 'student' && (
              <>
                <button
                  onClick={() => { setActiveTab('dashboard'); setSelectedCourse(null); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                    activeTab === 'dashboard' && !selectedCourse
                      ? 'bg-gradient-to-r from-[#00338D] to-[#00C4CC] text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                  Dashboard & Stats
                </button>

                <button
                  onClick={() => { setActiveTab('courses'); setSelectedCourse(null); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                    activeTab === 'courses' || selectedCourse
                      ? 'bg-gradient-to-r from-[#00338D] to-[#00C4CC] text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  My Subjects ({userCourses.length})
                </button>
              </>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-[#00338D] to-[#00C4CC] text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin LMS Panel
              </button>
            )}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">

        {/* ------------------------------------------------------------- */}
        {/* STUDENT DASHBOARD TAB                                          */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'dashboard' && currentUser.role === 'student' && !selectedCourse && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-[#00338D] to-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="relative z-10 max-w-xl">
                <span className="inline-block px-3 py-1 bg-[#00C4CC]/20 text-[#00C4CC] border border-[#00C4CC]/30 text-[11px] font-bold uppercase rounded-full mb-3">
                  Class {currentUser.grade} LMS Portal
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Welcome back, {currentUser.name}! 👋
                </h2>
                <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed">
                  Track your study hours, access Google Drive recorded video lectures, and download past papers for your enrolled subjects.
                </p>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#00C4CC]/10 to-transparent pointer-events-none hidden md:block"></div>
            </div>

            {/* Stats Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{currentUser.totalLecturesCompleted || 0}</p>
                  <p className="text-xs text-slate-400">Lectures Completed</p>
                </div>
              </div>

              <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{currentUser.totalHoursStudied || 0} hrs</p>
                  <p className="text-xs text-slate-400">Total Study Time</p>
                </div>
              </div>

              <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{userCourses.length} Enrolled</p>
                  <p className="text-xs text-slate-400">Active Subjects</p>
                </div>
              </div>
            </div>

            {/* Weekly Activity Bar Chart */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Weekly Study Hours Report</h3>
                  <p className="text-xs text-slate-400">Monitored hours across all subjects</p>
                </div>
                <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                  Total: {currentUser.weeklyHours.reduce((a, b) => a + b, 0).toFixed(1)} hrs
                </span>
              </div>

              {/* Simple Responsive Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-40 pt-6 px-2 border-b border-slate-800">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const hrs = currentUser.weeklyHours[idx] || 0;
                  const maxHeight = 8; // Max 8 hours for scale
                  const heightPercent = Math.min(100, (hrs / maxHeight) * 100);

                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2 group relative">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none transition">
                        {hrs} hrs
                      </div>
                      <div className="w-full max-w-[36px] bg-slate-800/80 rounded-t-lg h-full flex items-end overflow-hidden">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-gradient-to-t from-[#00338D] to-[#00C4CC] rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                        ></div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enrolled Courses Quick Access */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">Your Enrolled Subjects</h3>
              {userCourses.length === 0 ? (
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
                  No courses assigned yet. Contact EMZ Academy admin for subject enrollment.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className="p-5 bg-slate-900/90 border border-slate-800 hover:border-[#00C4CC]/50 rounded-2xl cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{course.icon}</span>
                        <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
                          {course.grade} Class
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {course.lectures.length} Recorded Lectures • {course.materials.length} Materials
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                        <span>Access Lectures</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* COURSES LIST VIEW TAB                                         */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'courses' && !selectedCourse && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Your Assigned Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {userCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition shadow-xl"
                >
                  <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 flex justify-between items-center">
                    <span className="text-3xl">{course.icon}</span>
                    <span className="text-xs font-bold text-[#00C4CC] bg-[#00C4CC]/10 px-2.5 py-1 rounded-full border border-[#00C4CC]/20">
                      {course.subject}
                    </span>
                  </div>
                  <div className="p-5 space-y-4">
                    <h3 className="font-bold text-white text-lg">{course.title}</h3>
                    <p className="text-xs text-slate-400">
                      High definition Google Drive recorded lectures and downloadable revision notes.
                    </p>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full py-2.5 bg-[#00338D] hover:bg-[#00338D]/80 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" /> View Lectures & Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* COURSE DETAIL & VIDEO LECTURE PLAYER VIEW                    */}
        {/* ------------------------------------------------------------- */}
        {selectedCourse && (
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => { setSelectedCourse(null); setActiveVideo(null); }}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              ← Back to Dashboard
            </button>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400">{selectedCourse.grade} Grade Subject</span>
                <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
              </div>
            </div>

            {/* Video Player Modal / Player Frame */}
            {activeVideo && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4 space-y-3">
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-400" />
                    Now Playing: {activeVideo.title}
                  </h3>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Google Drive Embedded Video Container */}
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-slate-800">
                  <iframe
                    src={`https://drive.google.com/file/d/${activeVideo.driveId}/preview`}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    title={activeVideo.title}
                  ></iframe>
                </div>
                <p className="text-xs text-slate-400 px-2">
                  * Note: Embedded video streaming straight from EMZ Virtual Academy Google Drive Cloud Storage.
                </p>
              </div>
            )}

            {/* Lectures List & Downloads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Lecture Playlist */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="font-bold text-white text-base">Course Video Lectures</h3>
                <div className="space-y-2">
                  {selectedCourse.lectures.map((lec, idx) => (
                    <div
                      key={lec.id}
                      className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLectureCompleted(selectedCourse.id, lec.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition ${
                            lec.completed
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'border border-slate-700 text-transparent hover:border-emerald-500'
                          }`}
                        >
                          ✓
                        </button>
                        <div>
                          <p className={`text-sm font-semibold ${lec.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                            {idx + 1}. {lec.title}
                          </p>
                          <span className="text-[11px] text-slate-500 font-mono">{lec.duration}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveVideo(lec)}
                        className="px-3 py-1.5 bg-[#00C4CC]/10 hover:bg-[#00C4CC]/20 text-[#00C4CC] border border-[#00C4CC]/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <PlayCircle className="w-4 h-4" /> Watch
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Material Downloads */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-base">Study Materials & Notes</h3>
                <div className="space-y-2">
                  {selectedCourse.materials.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-semibold text-white truncate">{mat.title}</p>
                          <p className="text-[10px] text-slate-500">{mat.size}</p>
                        </div>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert(`Downloading file: ${mat.title}`); }}
                        className="p-2 text-slate-400 hover:text-cyan-400 transition"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ADMIN MANAGEMENT PANEL TAB                                    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'admin' && currentUser.role === 'admin' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">EMZ Academy Admin Management</h2>
              <p className="text-xs text-slate-400">Manage student credentials, assign paid course access, and generate weekly reports.</p>
            </div>

            {/* Create New Student Credentials */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#00C4CC]" />
                Generate New Student Credentials
              </h3>

              <form onSubmit={handleCreateStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Student Full Name"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#00C4CC]"
                />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={newStudentUsername}
                  onChange={(e) => setNewStudentUsername(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#00C4CC]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={newStudentPass}
                  onChange={(e) => setNewStudentPass(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#00C4CC]"
                />
                <select
                  value={newStudentGrade}
                  onChange={(e) => setNewStudentGrade(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#00C4CC]"
                >
                  <option value="9th">9th Grade</option>
                  <option value="10th">10th Grade</option>
                  <option value="11th">11th Grade</option>
                  <option value="12th">12th Grade</option>
                </select>
                <div className="md:col-span-4">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00C4CC] hover:bg-[#00C4CC]/80 text-slate-950 font-bold text-xs rounded-xl transition"
                  >
                    Add Student Credentials
                  </button>
                </div>
              </form>
            </div>

            {/* Students List & Course Toggles */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white">Student Enrollment & Course Access Toggles</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Username / Pass</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Assigned Courses (Click to Toggle)</th>
                      <th className="p-3 text-right">Weekly Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.filter(u => u.role === 'student').map((student) => (
                      <tr key={student.id} className="hover:bg-slate-950/40">
                        <td className="p-3 font-semibold text-white">{student.name}</td>
                        <td className="p-3 font-mono text-cyan-400">
                          {student.username} / {student.password}
                        </td>
                        <td className="p-3 text-slate-300">{student.grade}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1.5">
                            {courses.map((course) => {
                              const isAssigned = student.assignedCourses?.includes(course.id);
                              return (
                                <button
                                  key={course.id}
                                  onClick={() => toggleCourseAssignment(student.id, course.id)}
                                  className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition border ${
                                    isAssigned
                                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                      : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300'
                                  }`}
                                >
                                  {course.subject} ({course.grade}) {isAssigned ? '✓' : '+'}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="p-3 text-right font-mono text-slate-300">
                          {student.totalHoursStudied || 0} hrs studied
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Report Export */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-white text-base">Weekly Activity & Performance Summary</h3>
                <p className="text-xs text-slate-400">Download or print full activity report for parents.</p>
              </div>
              <button
                onClick={() => alert("Weekly report exported! Ready for student parents report cards.")}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
              >
                <Download className="w-4 h-4 text-cyan-400" /> Export Weekly CSV Report
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}