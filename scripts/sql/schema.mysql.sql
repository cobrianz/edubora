-- Schema for MySQL

-- Table for multi-tenancy: Represents each school
CREATE TABLE IF NOT EXISTS school_tenants (
    id CHAR(36) PRIMARY KEY, -- UUIDs stored as CHAR(36)
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- Unique identifier for the school (e.g., global-academy)
    type VARCHAR(50), -- e.g., 'K-12', 'Primary', 'Secondary', 'Higher Education'
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for user roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL -- e.g., 'Admin', 'Teacher', 'Student', 'Parent', 'Librarian', 'Accountant'
);

-- Table for all users in the system
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
);

-- Table for students
CREATE TABLE IF NOT EXISTS students (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    user_id CHAR(36) UNIQUE,
    admission_number VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    current_class_id CHAR(36), -- Will be linked to classes table
    enrollment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for teachers
CREATE TABLE IF NOT EXISTS teachers (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    user_id CHAR(36) UNIQUE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    date_of_joining DATE,
    qualification TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for parents
CREATE TABLE IF NOT EXISTS parents (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    user_id CHAR(36) UNIQUE,
    phone_number VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Junction table for students and parents (many-to-many)
CREATE TABLE IF NOT EXISTS student_parents (
    student_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,
    relationship_type VARCHAR(50), -- e.g., 'Father', 'Mother', 'Guardian'
    PRIMARY KEY (student_id, parent_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE
);

-- Table for academic years
CREATE TABLE IF NOT EXISTS academic_years (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    year_name VARCHAR(50) NOT NULL, -- e.g., '2023-2024'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (school_id, year_name),
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Table for terms/semesters within an academic year
CREATE TABLE IF NOT EXISTS terms (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    academic_year_id CHAR(36) NOT NULL,
    term_name VARCHAR(50) NOT NULL, -- e.g., 'Term 1', 'Semester A'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (academic_year_id, term_name),
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
);

-- Table for classes/grades
CREATE TABLE IF NOT EXISTS classes (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    academic_year_id CHAR(36) NOT NULL,
    class_name VARCHAR(100) NOT NULL, -- e.g., 'Grade 10A', 'Year 7'
    teacher_id CHAR(36), -- Homeroom teacher
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (school_id, academic_year_id, class_name),
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- Update students table to reference classes
ALTER TABLE students ADD CONSTRAINT fk_current_class
FOREIGN KEY (current_class_id) REFERENCES classes(id) ON DELETE SET NULL;

-- Table for subjects
CREATE TABLE IF NOT EXISTS subjects (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (school_id, subject_name),
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Junction table for classes and subjects (many-to-many)
CREATE TABLE IF NOT EXISTS class_subjects (
    class_id CHAR(36) NOT NULL,
    subject_id CHAR(36) NOT NULL,
    teacher_id CHAR(36), -- Teacher assigned to teach this subject in this class
    PRIMARY KEY (class_id, subject_id),
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- Table for lessons/topics
CREATE TABLE IF NOT EXISTS lessons (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    subject_id CHAR(36) NOT NULL,
    class_id CHAR(36) NOT NULL,
    lesson_title VARCHAR(255) NOT NULL,
    lesson_description TEXT,
    material_url TEXT, -- URL to lesson materials (e.g., PDF, video)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- Table for assessments (quizzes, exams, projects)
CREATE TABLE IF NOT EXISTS assessments (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    class_id CHAR(36) NOT NULL,
    subject_id CHAR(36) NOT NULL,
    assessment_name VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(50) NOT NULL, -- e.g., 'Quiz', 'Exam', 'Project'
    max_score DECIMAL(5, 2) NOT NULL,
    assessment_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Table for student assessment scores
CREATE TABLE IF NOT EXISTS student_assessments (
    student_id CHAR(36) NOT NULL,
    assessment_id CHAR(36) NOT NULL,
    score DECIMAL(5, 2),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, assessment_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
);

-- Table for assignments
CREATE TABLE IF NOT EXISTS assignments (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    class_id CHAR(36) NOT NULL,
    subject_id CHAR(36) NOT NULL,
    teacher_id CHAR(36) NOT NULL,
    assignment_title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME NOT NULL,
    max_score DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE RESTRICT
);

-- Table for student assignment submissions
CREATE TABLE IF NOT EXISTS student_assignments (
    student_id CHAR(36) NOT NULL,
    assignment_id CHAR(36) NOT NULL,
    submission_date DATETIME,
    submitted_file_url TEXT,
    score DECIMAL(5, 2),
    feedback TEXT,
    status VARCHAR(50) DEFAULT 'Pending', -- e.g., 'Submitted', 'Graded', 'Missing'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, assignment_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE
);

-- Table for grades (can be linked to assessments or assignments)
CREATE TABLE IF NOT EXISTS grades (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    subject_id CHAR(36) NOT NULL,
    assessment_id CHAR(36),
    assignment_id CHAR(36),
    grade_value VARCHAR(10) NOT NULL, -- e.g., 'A', 'B+', '85%'
    grade_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE RESTRICT,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE SET NULL,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE SET NULL
);

-- Table for timetable entries
CREATE TABLE IF NOT EXISTS timetable_entries (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    class_id CHAR(36) NOT NULL,
    subject_id CHAR(36) NOT NULL,
    teacher_id CHAR(36) NOT NULL,
    day_of_week INT NOT NULL, -- 1=Monday, 7=Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50),
    academic_year_id CHAR(36) NOT NULL,
    term_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE RESTRICT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE RESTRICT,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE SET NULL
);

-- Table for library books
CREATE TABLE IF NOT EXISTS books (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    publisher VARCHAR(255),
    publication_year INT,
    genre VARCHAR(100),
    total_copies INT NOT NULL DEFAULT 1,
    available_copies INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Table for book borrowing records
CREATE TABLE IF NOT EXISTS borrow_records (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    book_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATETIME NOT NULL,
    return_date DATETIME,
    fine_amount DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Borrowed', -- e.g., 'Borrowed', 'Returned', 'Overdue'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT
);

-- Table for fee structures
CREATE TABLE IF NOT EXISTS fees_structures (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    fee_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    academic_year_id CHAR(36) NOT NULL,
    class_id CHAR(36), -- Nullable if fee applies to all classes
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (school_id, fee_name, academic_year_id, class_id),
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
);

-- Table for student-specific fee assignments and status
CREATE TABLE IF NOT EXISTS student_fees (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    fee_structure_id CHAR(36) NOT NULL,
    amount_due DECIMAL(10, 2) NOT NULL,
    amount_paid DECIMAL(10, 2) DEFAULT 0.00,
    balance DECIMAL(10, 2) AS (amount_due - amount_paid) STORED,
    status VARCHAR(50) DEFAULT 'Unpaid', -- e.g., 'Paid', 'Partial', 'Unpaid'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (student_id, fee_structure_id),
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (fee_structure_id) REFERENCES fees_structures(id) ON DELETE RESTRICT
);

-- Table for payments received
CREATE TABLE IF NOT EXISTS payments (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_fee_id CHAR(36) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50), -- e.g., 'Cash', 'Bank Transfer', 'Card'
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_fee_id) REFERENCES student_fees(id) ON DELETE RESTRICT
);

-- Table for invoices
CREATE TABLE IF NOT EXISTS invoices (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Issued', -- e.g., 'Issued', 'Paid', 'Overdue'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT
);

-- Table for school expenses
CREATE TABLE IF NOT EXISTS expenses (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    expense_category VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Table for buses
CREATE TABLE IF NOT EXISTS buses (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    bus_number VARCHAR(50) UNIQUE NOT NULL,
    capacity INT,
    driver_name VARCHAR(255),
    driver_phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Table for transport routes
CREATE TABLE IF NOT EXISTS routes (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    start_point VARCHAR(255),
    end_point VARCHAR(255),
    distance DECIMAL(10, 2), -- in km or miles
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (school_id, route_name),
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Junction table for buses and routes (many-to-many)
CREATE TABLE IF NOT EXISTS bus_routes (
    bus_id CHAR(36) NOT NULL,
    route_id CHAR(36) NOT NULL,
    PRIMARY KEY (bus_id, route_id),
    FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

-- Table for student transport assignments
CREATE TABLE IF NOT EXISTS student_transport_assignments (
    student_id CHAR(36) NOT NULL,
    route_id CHAR(36) NOT NULL,
    bus_id CHAR(36) NOT NULL,
    pickup_point VARCHAR(255),
    dropoff_point VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, route_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE RESTRICT,
    FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE RESTRICT
);

-- Table for co-curricular activities
CREATE TABLE IF NOT EXISTS activities (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    activity_name VARCHAR(255) NOT NULL,
    description TEXT,
    activity_date DATE,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Junction table for activities and participants (students)
CREATE TABLE IF NOT EXISTS activity_participants (
    activity_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    PRIMARY KEY (activity_id, student_id),
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Table for competitions
CREATE TABLE IF NOT EXISTS competitions (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    competition_name VARCHAR(255) NOT NULL,
    description TEXT,
    competition_date DATE,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Junction table for competitions and participants (students)
CREATE TABLE IF NOT EXISTS competition_participants (
    competition_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    result VARCHAR(255), -- e.g., '1st Place', 'Participant'
    award TEXT,
    PRIMARY KEY (competition_id, student_id),
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Table for student achievements
CREATE TABLE IF NOT EXISTS achievements (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    achievement_name VARCHAR(255) NOT NULL,
    description TEXT,
    award_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Table for welfare cases
CREATE TABLE IF NOT EXISTS welfare_cases (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    case_type VARCHAR(100) NOT NULL, -- e.g., 'Bullying', 'Family Issue', 'Behavioral'
    description TEXT NOT NULL,
    reported_by VARCHAR(255), -- Name or role of reporter
    report_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Open', -- e.g., 'Open', 'Closed', 'Pending'
    resolution TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT
);

-- Table for student health records
CREATE TABLE IF NOT EXISTS health_records (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) UNIQUE NOT NULL,
    medical_condition TEXT,
    allergies TEXT,
    medications TEXT,
    last_updated DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Table for counseling sessions
CREATE TABLE IF NOT EXISTS counseling_sessions (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    counselor_id CHAR(36), -- Can be a teacher or dedicated counselor
    session_date DATETIME NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT,
    FOREIGN KEY (counselor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table for emergency contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(100),
    phone_number VARCHAR(50) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Table for internal messages/notifications
CREATE TABLE IF NOT EXISTS messages (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    sender_id CHAR(36) NOT NULL,
    receiver_id CHAR(36) NOT NULL,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Table for school events
CREATE TABLE IF NOT EXISTS events (
    id CHAR(36) PRIMARY KEY,
    school_id CHAR(36) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES school_tenants(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_parents_school_id ON parents(school_id);
CREATE INDEX idx_classes_school_id ON classes(school_id);
CREATE INDEX idx_subjects_school_id ON subjects(school_id);
CREATE INDEX idx_assessments_school_id ON assessments(school_id);
CREATE INDEX idx_assignments_school_id ON assignments(school_id);
CREATE INDEX idx_grades_school_id ON grades(school_id);
CREATE INDEX idx_timetable_entries_school_id ON timetable_entries(school_id);
CREATE INDEX idx_books_school_id ON books(school_id);
CREATE INDEX idx_borrow_records_school_id ON borrow_records(school_id);
CREATE INDEX idx_fees_structures_school_id ON fees_structures(school_id);
CREATE INDEX idx_student_fees_school_id ON student_fees(school_id);
CREATE INDEX idx_payments_school_id ON payments(school_id);
CREATE INDEX idx_invoices_school_id ON invoices(school_id);
CREATE INDEX idx_expenses_school_id ON expenses(school_id);
CREATE INDEX idx_buses_school_id ON buses(school_id);
CREATE INDEX idx_routes_school_id ON routes(school_id);
CREATE INDEX idx_activities_school_id ON activities(school_id);
CREATE INDEX idx_competitions_school_id ON competitions(school_id);
CREATE INDEX idx_achievements_school_id ON achievements(school_id);
CREATE INDEX idx_welfare_cases_school_id ON welfare_cases(school_id);
CREATE INDEX idx_health_records_school_id ON health_records(school_id);
CREATE INDEX idx_counseling_sessions_school_id ON counseling_sessions(school_id);
CREATE INDEX idx_emergency_contacts_school_id ON emergency_contacts(school_id);
CREATE INDEX idx_messages_school_id ON messages(school_id);
CREATE INDEX idx_events_school_id ON events(school_id);
