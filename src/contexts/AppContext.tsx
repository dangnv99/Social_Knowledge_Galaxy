import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Document, User, Activity, LoginCredentials, AuthState, SearchFilters } from '../types';

interface AppContextType {
  user: User;
  authState: AuthState;
  documents: Document[];
  activities: Activity[];
  searchFilters: SearchFilters;
  selectedDocument: Document | null;
  setActiveView: (view: string) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'rating' | 'totalRatings'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  setSelectedDocument: (doc: Document | null) => void;
  rateDocument: (docId: string, rating: number) => void;
  viewDocument: (docId: string) => void;
  getFilteredDocuments: () => Document[];
  getUserDocuments: () => Document[];
  getRecentDocuments: () => Document[];
  getPopularDocuments: () => Document[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  name: 'Nguyễn Thị Minh Anh',
  email: 'minh.anh@company.com',
  avatar: '👩‍💼',
  role: 'Senior Manager',
  department: 'Technology',
  isAuthenticated: false,
  permissions: ['read', 'write', 'delete', 'admin'],
  badges: [
    { id: '1', name: 'Người tiên phong', icon: '🚀', color: 'from-blue-500 to-purple-600' },
    { id: '2', name: 'Chuyên gia tri thức', icon: '🧠', color: 'from-purple-500 to-pink-600' },
    { id: '3', name: 'Người chia sẻ', icon: '💫', color: 'from-green-500 to-blue-600' }
  ]
};

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'SAP S/4HANA Implementation Guide',
    content: `# SAP S/4HANA Implementation Roadmap

## Project Overview
Our company is implementing SAP S/4HANA to replace legacy systems and optimize business processes.

## Implementation Timeline
- **Phase 1 (Q1-Q2 2024):** Business Analysis & System Design
- **Phase 2 (Q3-Q4 2024):** Configuration & Development
- **Phase 3 (Q1 2025):** Testing & User Training
- **Phase 4 (Q2 2025):** Go-Live & Support

## Key Modules
- **FI/CO:** Financial Accounting & Controlling
- **MM:** Materials Management
- **SD:** Sales & Distribution
- **HR:** Human Resources

## Project Team
- Project Manager: Nguyễn Văn Hùng
- Business Analyst: Trần Thị Lan
- Technical Lead: Lê Minh Tuấn
- Training Coordinator: Phạm Thị Hoa

## Support Contacts
- Hotline: 1900-1234
- Email: erp-support@company.com
- Teams: ERP Support Team`,
    summary: 'Complete SAP S/4HANA implementation guide with timeline, modules, and team structure for enterprise deployment.',
    tags: ['ERP', 'SAP', 'Implementation', 'Business Process'],
    author: 'Nguyễn Văn Hùng',
    authorId: '2',
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
    visibility: 'public',
    rating: 4.5,
    totalRatings: 28,
    views: 145,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '6',
    title: 'Employee Handbook 2024',
    content: `# Employee Handbook 2024

## Company Overview
Welcome to our organization! This handbook contains essential information about our company culture, policies, and procedures.

## Core Values
- Innovation and Excellence
- Collaboration and Teamwork  
- Integrity and Transparency
- Customer Focus
- Continuous Learning

## Work Environment
- Flexible working hours
- Remote work options
- Professional development opportunities
- Health and wellness programs

## Code of Conduct
- Professional behavior standards
- Ethical guidelines
- Conflict resolution procedures
- Reporting mechanisms

## Benefits Package
- Health insurance coverage
- Retirement savings plan
- Paid time off policy
- Professional development budget

## Contact Information
- HR Department: hr@company.com
- Employee Relations: relations@company.com
- Benefits: benefits@company.com`,
    summary: 'Comprehensive employee handbook covering company policies, benefits, and workplace guidelines.',
    tags: ['HR', 'Policy', 'Employee Guide', 'Handbook'],
    author: 'Phạm Thị Hương',
    authorId: '4',
    createdAt: '2024-12-10T08:30:00Z',
    updatedAt: '2024-12-10T08:30:00Z',
    visibility: 'public',
    rating: 4.6,
    totalRatings: 67,
    views: 324,
    fileType: 'text',
    department: 'Human Resources',
    comments: []
  },
  {
    id: '7',
    title: 'IT Asset Management Policy',
    content: `# IT Asset Management Policy

## Purpose
This policy establishes guidelines for managing IT assets throughout their lifecycle.

## Asset Categories
- Hardware: Computers, servers, network equipment
- Software: Applications, licenses, subscriptions
- Mobile devices: Phones, tablets, accessories
- Peripherals: Monitors, printers, keyboards

## Asset Lifecycle
1. **Procurement**: Approval and purchasing process
2. **Deployment**: Installation and configuration
3. **Maintenance**: Updates and repairs
4. **Retirement**: Secure disposal and data wiping

## Responsibilities
- IT Department: Asset tracking and maintenance
- Employees: Proper usage and reporting issues
- Managers: Approval for new asset requests

## Security Requirements
- All devices must have endpoint protection
- Regular security updates required
- Data encryption for mobile devices
- Secure disposal of retired assets

## Compliance
- Regular asset audits
- License compliance monitoring
- Documentation requirements
- Reporting procedures`,
    summary: 'IT asset management policy covering hardware, software, and security requirements for organizational assets.',
    tags: ['IT', 'Asset Management', 'Policy', 'Security'],
    author: 'Nguyễn Minh Tuấn',
    authorId: '6',
    createdAt: '2024-12-09T15:20:00Z',
    updatedAt: '2024-12-09T15:20:00Z',
    visibility: 'public',
    rating: 4.1,
    totalRatings: 29,
    views: 156,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '8',
    title: 'Project Management Best Practices',
    content: `# Project Management Best Practices

## Project Lifecycle
1. **Initiation**: Define scope and objectives
2. **Planning**: Create detailed project plan
3. **Execution**: Implement project activities
4. **Monitoring**: Track progress and performance
5. **Closure**: Complete deliverables and lessons learned

## Key Methodologies
- **Agile**: Iterative development approach
- **Waterfall**: Sequential project phases
- **Hybrid**: Combination of methodologies

## Tools and Templates
- Project charter template
- Work breakdown structure
- Risk register
- Status report format
- Lessons learned template

## Communication Plan
- Stakeholder identification
- Meeting schedules
- Reporting requirements
- Escalation procedures

## Risk Management
- Risk identification process
- Impact and probability assessment
- Mitigation strategies
- Contingency planning

## Quality Assurance
- Quality standards definition
- Review and approval processes
- Testing procedures
- Continuous improvement`,
    summary: 'Comprehensive guide to project management methodologies, tools, and best practices for successful project delivery.',
    tags: ['Project Management', 'Agile', 'Best Practices', 'Templates'],
    author: 'Lê Minh Tuấn',
    authorId: '7',
    createdAt: '2024-12-08T11:45:00Z',
    updatedAt: '2024-12-08T11:45:00Z',
    visibility: 'public',
    rating: 4.4,
    totalRatings: 38,
    views: 201,
    fileType: 'text',
    department: 'Project Management',
    comments: []
  },
  {
    id: '9',
    title: 'Financial Reporting Guidelines',
    content: `# Financial Reporting Guidelines

## Reporting Schedule
- Monthly reports: Due by 5th of following month
- Quarterly reports: Due within 15 days of quarter end
- Annual reports: Due by January 31st

## Required Reports
- Income Statement
- Balance Sheet
- Cash Flow Statement
- Budget vs Actual Analysis

## Data Sources
- ERP system transactions
- Bank statements
- Invoice records
- Expense reports

## Review Process
1. Department manager review
2. Finance team validation
3. CFO approval
4. Distribution to stakeholders

## Compliance Requirements
- GAAP standards adherence
- Internal control documentation
- Audit trail maintenance
- Regulatory filing requirements

## Key Performance Indicators
- Revenue growth
- Profit margins
- Cash flow ratios
- Budget variance analysis

## Contact Information
- Finance Team: finance@company.com
- Controller: controller@company.com
- CFO Office: cfo@company.com`,
    summary: 'Financial reporting guidelines including schedules, requirements, and compliance standards for accurate financial reporting.',
    tags: ['Finance', 'Reporting', 'Compliance', 'GAAP'],
    author: 'Trần Thị Lan',
    authorId: '8',
    createdAt: '2024-12-07T14:10:00Z',
    updatedAt: '2024-12-07T14:10:00Z',
    visibility: 'public',
    rating: 4.3,
    totalRatings: 31,
    views: 178,
    fileType: 'text',
    department: 'Finance',
    comments: []
  },
  {
    id: '10',
    title: 'Customer Service Excellence Manual',
    content: `# Customer Service Excellence Manual

## Service Standards
- Response time: Within 2 hours for emails
- Phone calls: Answer within 3 rings
- Resolution time: 24-48 hours for standard issues
- Customer satisfaction: Minimum 4.5/5 rating

## Communication Guidelines
- Professional and courteous tone
- Active listening techniques
- Clear and concise explanations
- Follow-up procedures

## Escalation Process
1. Level 1: Customer service representative
2. Level 2: Team supervisor
3. Level 3: Department manager
4. Level 4: Director of customer service

## Common Scenarios
- Product inquiries and demonstrations
- Billing questions and disputes
- Technical support requests
- Complaint resolution procedures

## Tools and Resources
- CRM system access
- Knowledge base articles
- Product documentation
- Contact directory

## Performance Metrics
- Customer satisfaction scores
- First call resolution rate
- Average handling time
- Quality assurance scores

## Training Requirements
- Initial certification program
- Monthly skill development sessions
- Product knowledge updates
- Soft skills enhancement`,
    summary: 'Customer service excellence manual with standards, procedures, and best practices for superior customer experience.',
    tags: ['Customer Service', 'Excellence', 'Standards', 'Training'],
    author: 'Phạm Thị Hoa',
    authorId: '9',
    createdAt: '2024-12-06T10:25:00Z',
    updatedAt: '2024-12-06T10:25:00Z',
    visibility: 'public',
    rating: 4.7,
    totalRatings: 45,
    views: 267,
    fileType: 'text',
    department: 'Customer Service',
    comments: []
  },
  {
    id: '11',
    title: 'Data Privacy and GDPR Compliance',
    content: `# Data Privacy and GDPR Compliance Guide

## Overview
This guide ensures compliance with GDPR and other data privacy regulations.

## Data Classification
- **Personal Data**: Names, emails, phone numbers
- **Sensitive Data**: Health records, financial information
- **Public Data**: Marketing materials, press releases

## Privacy Principles
1. Lawfulness, fairness, and transparency
2. Purpose limitation
3. Data minimization
4. Accuracy
5. Storage limitation
6. Integrity and confidentiality
7. Accountability

## Individual Rights
- Right to information
- Right of access
- Right to rectification
- Right to erasure
- Right to restrict processing
- Right to data portability
- Right to object

## Data Processing Procedures
- Consent management
- Data mapping and inventory
- Privacy impact assessments
- Breach notification procedures

## Technical Measures
- Encryption at rest and in transit
- Access controls and authentication
- Regular security assessments
- Data backup and recovery

## Training and Awareness
- Employee privacy training
- Regular compliance updates
- Incident response procedures
- Documentation requirements`,
    summary: 'Comprehensive GDPR compliance guide covering data privacy principles, individual rights, and technical measures.',
    tags: ['GDPR', 'Data Privacy', 'Compliance', 'Security'],
    author: 'Trần Minh Đức',
    authorId: '3',
    createdAt: '2024-12-05T16:40:00Z',
    updatedAt: '2024-12-05T16:40:00Z',
    visibility: 'public',
    rating: 4.5,
    totalRatings: 52,
    views: 289,
    fileType: 'text',
    department: 'Legal',
    comments: []
  },
  {
    id: '12',
    title: 'Remote Work Policy and Guidelines',
    content: `# Remote Work Policy and Guidelines

## Eligibility Criteria
- Minimum 6 months employment
- Satisfactory performance rating
- Role suitable for remote work
- Manager approval required

## Work Arrangements
- **Full Remote**: 100% remote work
- **Hybrid**: 2-3 days remote per week
- **Flexible**: Occasional remote work

## Technology Requirements
- Reliable internet connection (minimum 25 Mbps)
- Company-provided laptop and equipment
- Secure VPN access
- Video conferencing capabilities

## Communication Standards
- Daily check-ins with team
- Regular video meetings
- Prompt response to messages
- Availability during core hours

## Productivity Expectations
- Maintain regular work schedule
- Meet all deadlines and deliverables
- Participate in team meetings
- Complete required training

## Security Requirements
- Use company-approved software only
- Secure home office setup
- Regular software updates
- Report security incidents immediately

## Performance Management
- Regular one-on-one meetings
- Goal setting and tracking
- Performance reviews
- Career development planning`,
    summary: 'Remote work policy covering eligibility, arrangements, technology requirements, and performance expectations.',
    tags: ['Remote Work', 'Policy', 'Hybrid', 'Productivity'],
    author: 'Lê Thị Mai',
    authorId: '5',
    createdAt: '2024-12-04T13:15:00Z',
    updatedAt: '2024-12-04T13:15:00Z',
    visibility: 'public',
    rating: 4.2,
    totalRatings: 63,
    views: 312,
    fileType: 'text',
    department: 'Human Resources',
    comments: []
  },
  // User's documents (authorId: '1')
  {
    id: '13',
    title: 'Digital Transformation Strategy 2024-2026',
    content: `# Digital Transformation Strategy 2024-2026

## Executive Summary
Our digital transformation initiative aims to modernize business processes, enhance customer experience, and drive innovation across all departments.

## Strategic Objectives
- Digitize 80% of manual processes by 2025
- Implement AI-powered analytics platform
- Enhance cybersecurity infrastructure
- Improve employee digital skills

## Technology Roadmap
### Phase 1 (2024)
- Cloud migration completion
- ERP system upgrade
- Digital workplace tools deployment

### Phase 2 (2025)
- AI/ML implementation
- Process automation
- Data analytics platform

### Phase 3 (2026)
- Advanced analytics
- IoT integration
- Innovation lab establishment

## Investment Plan
- Total budget: $2.5M over 3 years
- Technology: 60%
- Training: 25%
- Consulting: 15%

## Success Metrics
- Process efficiency improvement: 40%
- Customer satisfaction: 95%
- Employee productivity: 30% increase
- Cost reduction: 20%`,
    summary: 'Comprehensive digital transformation strategy outlining technology roadmap, investment plans, and success metrics for 2024-2026.',
    tags: ['Digital Transformation', 'Strategy', 'Technology', 'Innovation', 'AI'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-16T09:00:00Z',
    updatedAt: '2024-12-16T09:00:00Z',
    visibility: 'public',
    rating: 4.8,
    totalRatings: 45,
    views: 289,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '14',
    title: 'Leadership Development Program Framework',
    content: `# Leadership Development Program Framework

## Program Overview
A comprehensive leadership development initiative designed to cultivate next-generation leaders within our organization.

## Target Audience
- High-potential employees
- Mid-level managers
- Senior individual contributors
- Cross-functional team leads

## Core Competencies
### Strategic Thinking
- Vision development
- Strategic planning
- Market analysis
- Innovation mindset

### People Leadership
- Team building
- Coaching and mentoring
- Performance management
- Conflict resolution

### Operational Excellence
- Process optimization
- Quality management
- Resource allocation
- Risk management

## Program Structure
### Module 1: Self-Awareness (Month 1-2)
- Leadership assessment
- 360-degree feedback
- Personal development planning

### Module 2: Team Leadership (Month 3-4)
- Team dynamics
- Communication skills
- Delegation techniques

### Module 3: Strategic Leadership (Month 5-6)
- Business strategy
- Change management
- Innovation leadership

## Delivery Methods
- Interactive workshops
- Executive coaching
- Peer learning groups
- Action learning projects
- Mentorship programs`,
    summary: 'Leadership development program framework focusing on strategic thinking, people leadership, and operational excellence.',
    tags: ['Leadership', 'Development', 'Training', 'Management', 'Strategy'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-15T14:30:00Z',
    updatedAt: '2024-12-15T14:30:00Z',
    visibility: 'group',
    rating: 4.7,
    totalRatings: 32,
    views: 198,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '15',
    title: 'Agile Project Management Methodology',
    content: `# Agile Project Management Methodology

## Introduction to Agile
Agile methodology emphasizes iterative development, team collaboration, and rapid response to change.

## Agile Principles
1. Individuals and interactions over processes and tools
2. Working software over comprehensive documentation
3. Customer collaboration over contract negotiation
4. Responding to change over following a plan

## Scrum Framework
### Roles
- **Product Owner**: Defines requirements and priorities
- **Scrum Master**: Facilitates process and removes blockers
- **Development Team**: Builds the product

### Events
- **Sprint Planning**: Define sprint goals and tasks
- **Daily Standup**: Quick progress updates
- **Sprint Review**: Demonstrate completed work
- **Sprint Retrospective**: Improve team processes

### Artifacts
- **Product Backlog**: Prioritized feature list
- **Sprint Backlog**: Tasks for current sprint
- **Product Increment**: Working product version

## Implementation Guidelines
### Sprint Duration
- Recommended: 2-4 weeks
- Consistent sprint length
- Time-boxed events

### Team Size
- Optimal: 5-9 team members
- Cross-functional skills
- Self-organizing teams

## Tools and Techniques
- User stories and acceptance criteria
- Story point estimation
- Burndown charts
- Kanban boards
- Velocity tracking`,
    summary: 'Complete guide to Agile project management methodology including Scrum framework, roles, events, and implementation guidelines.',
    tags: ['Agile', 'Scrum', 'Project Management', 'Methodology', 'Development'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-14T11:20:00Z',
    updatedAt: '2024-12-14T11:20:00Z',
    visibility: 'public',
    rating: 4.6,
    totalRatings: 28,
    views: 167,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '16',
    title: 'Cloud Migration Best Practices',
    content: `# Cloud Migration Best Practices

## Migration Strategy
A systematic approach to moving applications and data to cloud infrastructure while minimizing risks and downtime.

## Assessment Phase
### Current State Analysis
- Application inventory
- Infrastructure mapping
- Performance baselines
- Security requirements
- Compliance needs

### Cloud Readiness Assessment
- Application compatibility
- Data dependencies
- Integration requirements
- Performance expectations

## Migration Approaches
### Rehost (Lift and Shift)
- Minimal changes to applications
- Quick migration timeline
- Cost-effective for legacy systems

### Replatform
- Minor optimizations for cloud
- Improved performance and cost
- Moderate complexity

### Refactor
- Redesign for cloud-native
- Maximum cloud benefits
- Higher investment required

## Implementation Steps
1. **Planning and Design**
   - Architecture review
   - Migration timeline
   - Resource allocation

2. **Pilot Migration**
   - Select low-risk applications
   - Test migration process
   - Validate performance

3. **Full Migration**
   - Phased approach
   - Continuous monitoring
   - Rollback procedures

## Security Considerations
- Data encryption in transit and at rest
- Identity and access management
- Network security configuration
- Compliance validation`,
    summary: 'Comprehensive guide to cloud migration strategies, assessment methods, and implementation best practices.',
    tags: ['Cloud Migration', 'Best Practices', 'Infrastructure', 'Strategy', 'Security'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-13T16:45:00Z',
    updatedAt: '2024-12-13T16:45:00Z',
    visibility: 'public',
    rating: 4.5,
    totalRatings: 41,
    views: 234,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '17',
    title: 'Data Analytics and Business Intelligence Strategy',
    content: `# Data Analytics and Business Intelligence Strategy

## Strategic Vision
Transform data into actionable insights to drive business growth and operational efficiency.

## Current State Assessment
### Data Sources
- ERP systems
- CRM platforms
- Web analytics
- Social media data
- IoT sensors

### Challenges
- Data silos across departments
- Inconsistent data quality
- Limited self-service capabilities
- Manual reporting processes

## Target Architecture
### Data Lake
- Centralized data repository
- Structured and unstructured data
- Scalable storage solution
- Real-time data ingestion

### Analytics Platform
- Self-service BI tools
- Advanced analytics capabilities
- Machine learning integration
- Interactive dashboards

## Implementation Roadmap
### Phase 1: Foundation (Q1-Q2)
- Data governance framework
- Data quality improvement
- Basic reporting automation

### Phase 2: Enhancement (Q3-Q4)
- Advanced analytics platform
- Self-service BI deployment
- User training programs

### Phase 3: Innovation (Year 2)
- Machine learning models
- Predictive analytics
- Real-time insights

## Key Performance Indicators
- Data quality score: >95%
- Report automation: 80%
- User adoption rate: 75%
- Decision-making speed: 50% faster`,
    summary: 'Strategic framework for implementing data analytics and business intelligence capabilities across the organization.',
    tags: ['Data Analytics', 'Business Intelligence', 'Strategy', 'Machine Learning', 'BI'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-12T10:30:00Z',
    updatedAt: '2024-12-12T10:30:00Z',
    visibility: 'group',
    rating: 4.4,
    totalRatings: 36,
    views: 201,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '18',
    title: 'Innovation Management Framework',
    content: `# Innovation Management Framework

## Innovation Strategy
A systematic approach to fostering innovation culture and managing innovation processes across the organization.

## Innovation Types
### Product Innovation
- New product development
- Feature enhancements
- Service improvements
- Customer experience innovation

### Process Innovation
- Workflow optimization
- Automation implementation
- Quality improvements
- Cost reduction initiatives

### Business Model Innovation
- Revenue model changes
- Market expansion
- Partnership strategies
- Digital transformation

## Innovation Process
### Idea Generation
- Employee suggestion programs
- Customer feedback analysis
- Market research insights
- Technology trend monitoring

### Idea Evaluation
- Feasibility assessment
- Market potential analysis
- Resource requirements
- Risk evaluation

### Development and Testing
- Prototype development
- Pilot testing
- User feedback collection
- Iterative improvements

### Implementation
- Go-to-market strategy
- Change management
- Training and support
- Performance monitoring

## Innovation Governance
### Innovation Committee
- Senior leadership representation
- Cross-functional expertise
- Decision-making authority
- Resource allocation

### Innovation Metrics
- Ideas generated per quarter
- Implementation success rate
- Time to market
- ROI on innovation investments`,
    summary: 'Comprehensive framework for managing innovation processes, from idea generation to implementation and governance.',
    tags: ['Innovation', 'Management', 'Framework', 'Strategy', 'Process'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-11T15:20:00Z',
    updatedAt: '2024-12-11T15:20:00Z',
    visibility: 'public',
    rating: 4.3,
    totalRatings: 29,
    views: 156,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '19',
    title: 'Cybersecurity Incident Response Plan',
    content: `# Cybersecurity Incident Response Plan

## Incident Response Overview
A structured approach to handling cybersecurity incidents to minimize impact and restore normal operations quickly.

## Incident Classification
### Severity Levels
- **Critical**: Major business impact, data breach
- **High**: Significant impact, system compromise
- **Medium**: Moderate impact, potential threat
- **Low**: Minor impact, suspicious activity

### Incident Types
- Malware infections
- Data breaches
- Unauthorized access
- Denial of service attacks
- Phishing attempts

## Response Team Structure
### Incident Commander
- Overall response coordination
- Decision-making authority
- Stakeholder communication

### Technical Team
- System analysis and containment
- Evidence collection
- Recovery implementation

### Communication Team
- Internal notifications
- External communications
- Media relations

## Response Procedures
### Phase 1: Detection and Analysis
- Incident identification
- Initial assessment
- Evidence preservation
- Impact analysis

### Phase 2: Containment
- Immediate containment
- System isolation
- Threat neutralization
- Damage assessment

### Phase 3: Recovery
- System restoration
- Data recovery
- Service resumption
- Monitoring enhancement

### Phase 4: Post-Incident
- Lessons learned review
- Process improvements
- Documentation updates
- Training updates`,
    summary: 'Detailed cybersecurity incident response plan covering classification, team structure, and response procedures.',
    tags: ['Cybersecurity', 'Incident Response', 'Security', 'Emergency', 'Procedures'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-10T13:45:00Z',
    updatedAt: '2024-12-10T13:45:00Z',
    visibility: 'group',
    rating: 4.7,
    totalRatings: 38,
    views: 223,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '20',
    title: 'Performance Management System Design',
    content: `# Performance Management System Design

## System Overview
A comprehensive performance management system that aligns individual goals with organizational objectives and drives continuous improvement.

## Core Components
### Goal Setting
- SMART objectives framework
- Cascading organizational goals
- Individual development plans
- Quarterly goal reviews

### Performance Tracking
- Key performance indicators
- Progress monitoring tools
- Regular check-ins
- 360-degree feedback

### Performance Evaluation
- Annual performance reviews
- Mid-year assessments
- Peer evaluations
- Self-assessments

## Performance Rating Scale
### Exceeds Expectations (5)
- Consistently surpasses goals
- Demonstrates exceptional performance
- Provides innovative solutions

### Meets Expectations (4)
- Achieves all major objectives
- Delivers quality work consistently
- Meets deadlines and standards

### Partially Meets Expectations (3)
- Achieves most objectives
- Requires some guidance
- Shows improvement potential

### Below Expectations (2)
- Fails to meet key objectives
- Requires significant improvement
- Needs additional support

## Development Planning
### Career Pathing
- Role progression maps
- Skill development requirements
- Leadership pipeline

### Training and Development
- Technical skill enhancement
- Leadership development
- Cross-functional exposure
- External learning opportunities`,
    summary: 'Comprehensive performance management system design including goal setting, tracking, evaluation, and development planning.',
    tags: ['Performance Management', 'HR', 'Goals', 'Development', 'Evaluation'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-09T12:15:00Z',
    updatedAt: '2024-12-09T12:15:00Z',
    visibility: 'private',
    rating: 4.2,
    totalRatings: 25,
    views: 134,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '21',
    title: 'Quality Assurance Standards Manual',
    content: `# Quality Assurance Standards Manual

## Quality Management System
A systematic approach to ensuring consistent quality in all products, services, and processes.

## Quality Standards
### ISO 9001 Compliance
- Customer focus
- Leadership commitment
- Process approach
- Continuous improvement

### Quality Objectives
- Customer satisfaction: >95%
- Defect rate: <0.1%
- On-time delivery: >98%
- First-pass yield: >99%

## Quality Processes
### Design Quality
- Requirements analysis
- Design reviews
- Prototype testing
- Design validation

### Process Quality
- Standard operating procedures
- Process controls
- Statistical process control
- Process capability studies

### Product Quality
- Incoming inspection
- In-process testing
- Final inspection
- Customer feedback analysis

## Quality Control Methods
### Statistical Methods
- Control charts
- Process capability analysis
- Design of experiments
- Regression analysis

### Testing Procedures
- Functional testing
- Performance testing
- Reliability testing
- User acceptance testing

## Continuous Improvement
### PDCA Cycle
- Plan: Identify improvement opportunities
- Do: Implement changes
- Check: Monitor results
- Act: Standardize improvements

### Quality Metrics
- Customer complaints
- Internal audit findings
- Corrective action effectiveness
- Process performance indicators`,
    summary: 'Comprehensive quality assurance standards manual covering ISO 9001 compliance, processes, and continuous improvement.',
    tags: ['Quality Assurance', 'ISO 9001', 'Standards', 'Process', 'Improvement'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-08T14:30:00Z',
    updatedAt: '2024-12-08T14:30:00Z',
    visibility: 'public',
    rating: 4.6,
    totalRatings: 33,
    views: 189,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '22',
    title: 'Business Continuity Planning Guide',
    content: `# Business Continuity Planning Guide

## Business Continuity Overview
A comprehensive framework to ensure business operations continue during and after disruptive events.

## Risk Assessment
### Threat Identification
- Natural disasters
- Cyber attacks
- Supply chain disruptions
- Pandemic outbreaks
- Technology failures

### Impact Analysis
- Revenue loss estimation
- Operational disruption
- Customer impact
- Regulatory compliance
- Reputation damage

## Business Impact Analysis
### Critical Functions
- Customer service operations
- Financial transactions
- Supply chain management
- IT infrastructure
- Human resources

### Recovery Time Objectives
- Critical functions: 4 hours
- Important functions: 24 hours
- Standard functions: 72 hours

## Continuity Strategies
### Preventive Measures
- Risk mitigation controls
- Redundant systems
- Backup procedures
- Insurance coverage

### Response Procedures
- Emergency notification
- Crisis management team
- Communication protocols
- Resource mobilization

### Recovery Plans
- Alternate work locations
- Technology recovery
- Supply chain alternatives
- Vendor management

## Plan Maintenance
### Regular Testing
- Tabletop exercises
- Simulation drills
- Full-scale tests
- Lessons learned integration

### Plan Updates
- Annual reviews
- Change management
- Training updates
- Documentation maintenance`,
    summary: 'Complete business continuity planning guide covering risk assessment, impact analysis, and recovery strategies.',
    tags: ['Business Continuity', 'Risk Management', 'Emergency', 'Planning', 'Recovery'],
    author: 'Nguyễn Thị Minh Anh',
    authorId: '1',
    createdAt: '2024-12-07T11:00:00Z',
    updatedAt: '2024-12-07T11:00:00Z',
    visibility: 'group',
    rating: 4.5,
    totalRatings: 27,
    views: 145,
    fileType: 'text',
    department: 'Technology',
    comments: []
  },
  {
    id: '2',
    title: 'Information Security Policy 2024',
    content: `# Corporate Information Security Guidelines

## Password Policy
- Minimum length: 12 characters
- Must include: uppercase, lowercase, numbers, special characters
- Change every 90 days
- Cannot reuse last 5 passwords

## System Access
- VPN required for remote work
- Two-factor authentication mandatory
- Screen lock when away from desk
- Logout at end of shift

## Data Handling
- Classify data by sensitivity level
- Encrypt data in transit and at rest
- Regular backups and recovery testing
- Report incidents immediately

## Security Training
- Mandatory for all new employees
- Quarterly updates required
- Phishing simulation exercises
- Regular assessment tests

## Emergency Contacts
- Security Team: security@company.com
- 24/7 Hotline: 1900-5678
- Incident Report: incident@company.com`,
    summary: 'Comprehensive information security policy covering passwords, access control, and data protection.',
    tags: ['Security', 'Policy', 'Data Protection', 'Compliance'],
    author: 'Trần Minh Đức',
    authorId: '3',
    createdAt: '2024-12-14T14:30:00Z',
    updatedAt: '2024-12-14T14:30:00Z',
    visibility: 'public',
    rating: 4.8,
    totalRatings: 35,
    views: 198,
    fileType: 'text',
    department: 'Security',
    comments: []
  },
  {
    id: '3',
    title: 'New Employee Onboarding Manual',
    content: `# Welcome to Our Company! 🎉

## First Day Schedule
### Morning
- 8:00 - Reception & ID card pickup
- 8:30 - HR documentation
- 9:00 - Office tour
- 9:30 - Meet your team
- 10:00 - IT account setup

### Afternoon
- 13:30 - Company culture briefing
- 14:30 - Security training
- 15:30 - Role introduction
- 16:30 - Q&A with buddy

## First Week
- **Day 2-3:** Technical training
- **Day 4-5:** Project participation
- **End of week:** Feedback session

## First Month
- Complete mandatory courses
- Attend team meetings
- 30-day performance review
- Peer feedback collection

## Required Reading
1. Employee Handbook
2. Code of Conduct
3. IT Security Policy
4. Project Guidelines
5. Organization Chart

## Support Contacts
- **HR:** hr@company.com
- **IT Support:** it-support@company.com
- **Buddy:** [Assigned individually]
- **Manager:** [Department specific]

## Completion Checklist
- [ ] Sign employment contract
- [ ] Receive work equipment
- [ ] Create system accounts
- [ ] Complete security training
- [ ] Meet team members
- [ ] Read project documentation
- [ ] Set up workspace
- [ ] Join team chat groups`,
    summary: 'Complete onboarding guide for new employees from day one through the first month.',
    tags: ['Onboarding', 'New Employee', 'HR', 'Training'],
    author: 'Phạm Thị Hương',
    authorId: '4',
    createdAt: '2024-12-13T09:15:00Z',
    updatedAt: '2024-12-13T09:15:00Z',
    visibility: 'public',
    rating: 4.7,
    totalRatings: 52,
    views: 287,
    fileType: 'text',
    department: 'Human Resources',
    comments: []
  },
  {
    id: '4',
    title: 'Leave Management & Attendance Policy',
    content: `# Leave Management & Attendance Guidelines

## Working Hours
### Standard Schedule
- **Morning:** 8:00 - 12:00
- **Afternoon:** 13:00 - 17:30
- **Saturday:** 8:00 - 12:00 (if required)

### Time Tracking
- Use magnetic card at entrance
- Mobile app check-in/out
- Report to manager if forgot to clock in

## Leave Types
### Annual Leave
- Under 5 years: 12 days/year
- 5-10 years: 15 days/year
- Over 10 years: 18 days/year

### Public Holidays
- As per government regulations
- Compensatory leave if holiday falls on weekend

### Sick Leave
- Medical certificate required
- Notify manager in advance
- Submit application within 3 days

## Leave Request Process
1. Fill leave request form in system
2. Manager approval
3. HR confirmation
4. Team notification

## Overtime
- Pre-approval from manager required
- Maximum 200 hours/year
- Compensation as per policy

## Work from Home
- Maximum 2 days/week
- Register 1 day in advance
- Daily work report required

## Contacts
- **HR:** hr@company.com
- **System:** hrms.company.com
- **Hotline:** 1900-1111`,
    summary: 'Complete guide to attendance tracking, leave types, and request procedures.',
    tags: ['HR', 'Leave Policy', 'Attendance', 'Work Schedule'],
    author: 'Lê Thị Mai',
    authorId: '5',
    createdAt: '2024-12-12T16:20:00Z',
    updatedAt: '2024-12-12T16:20:00Z',
    visibility: 'public',
    rating: 4.3,
    totalRatings: 41,
    views: 203,
    fileType: 'text',
    department: 'Human Resources',
    comments: []
  },
  {
    id: '5',
    title: 'Microsoft Teams User Guide',
    content: `# Microsoft Teams Complete Guide

## Installation & Login
- Download from teams.microsoft.com
- Login with company email
- Install on desktop and mobile

## Joining Meetings
### From Invitation
- Click link in email
- Or enter Meeting ID
- Choose "Join on web" if no app

### Creating New Meeting
- Click "New meeting"
- Add participants
- Set time and agenda
- Send invitation

## Chat & Messaging
- 1-on-1 chat with colleagues
- Create group chats for teams
- Use @mention to tag people
- Share files and images

## Teams & Channels
### Joining Teams
- Invited by admin
- Or request to join

### Using Channels
- General: company announcements
- Project channels: by project
- Social: casual conversations

## Screen Sharing
- Click "Share screen" icon
- Choose full screen or specific app
- Can share PowerPoint directly

## Recording Meetings
- Click "Start recording"
- File saved in SharePoint
- Send link to absent participants

## Useful Tips
- Mute mic when not speaking
- Use background blur
- Pin important messages
- Set status for availability

## Support Contacts
- **IT Support:** it@company.com
- **Teams Admin:** teams-admin@company.com
- **Training:** training@company.com`,
    summary: 'Detailed guide for using Microsoft Teams for work, from basic to advanced features.',
    tags: ['Microsoft Teams', 'Communication', 'Collaboration', 'IT'],
    author: 'Nguyễn Minh Tuấn',
    authorId: '6',
    createdAt: '2024-12-11T11:45:00Z',
    updatedAt: '2024-12-11T11:45:00Z',
    visibility: 'public',
    rating: 4.2,
    totalRatings: 33,
    views: 167,
    fileType: 'text',
    department: 'Technology',
    comments: []
  }
];

const mockActivities: Activity[] = [
  { id: '1', userId: '2', user: 'Nguyễn Văn Hùng', action: 'uploaded', target: 'Enterprise Resource Planning Implementation Guide', targetId: '1', timestamp: '2024-12-15T10:00:00Z', type: 'upload' },
  { id: '2', userId: '3', user: 'Trần Thị Lan', action: 'rated', target: 'Information Security Policy 2024', targetId: '2', timestamp: '2024-12-15T09:45:00Z', type: 'rate' },
  { id: '3', userId: '4', user: 'Lê Minh Tuấn', action: 'commented on', target: 'New Employee Onboarding Manual', targetId: '3', timestamp: '2024-12-15T09:30:00Z', type: 'comment' },
  { id: '4', userId: '5', user: 'Phạm Thị Hoa', action: 'updated', target: 'Leave Management & Attendance Policy', targetId: '4', timestamp: '2024-12-15T08:15:00Z', type: 'upload' },
  { id: '5', userId: '6', user: 'Nguyễn Minh Tuấn', action: 'shared', target: 'Microsoft Teams User Guide', targetId: '5', timestamp: '2024-12-15T07:30:00Z', type: 'share' },
  { id: '6', userId: '1', user: 'Nguyễn Thị Minh Anh', action: 'uploaded', target: 'Digital Transformation Strategy 2024-2026', targetId: '13', timestamp: '2024-12-14T16:20:00Z', type: 'upload' },
  { id: '7', userId: '3', user: 'Trần Minh Đức', action: 'rated', target: 'Cybersecurity Incident Response Plan', targetId: '14', timestamp: '2024-12-14T15:45:00Z', type: 'rate' },
  { id: '8', userId: '4', user: 'Phạm Thị Hương', action: 'commented on', target: 'Performance Management Framework', targetId: '15', timestamp: '2024-12-14T14:30:00Z', type: 'comment' },
  { id: '9', userId: '6', user: 'Nguyễn Minh Tuấn', action: 'viewed', target: 'Cloud Migration Best Practices', targetId: '16', timestamp: '2024-12-14T13:15:00Z', type: 'view' },
  { id: '10', userId: '7', user: 'Lê Minh Tuấn', action: 'shared', target: 'Agile Project Management Methodology', targetId: '17', timestamp: '2024-12-14T12:00:00Z', type: 'share' },
  { id: '11', userId: '8', user: 'Trần Thị Lan', action: 'uploaded', target: 'Business Continuity Planning Guide', targetId: '18', timestamp: '2024-12-14T10:45:00Z', type: 'upload' },
  { id: '12', userId: '9', user: 'Phạm Thị Hoa', action: 'rated', target: 'Quality Assurance Standards Manual', targetId: '19', timestamp: '2024-12-14T09:30:00Z', type: 'rate' },
  { id: '13', userId: '2', user: 'Nguyễn Văn Hùng', action: 'commented on', target: 'Data Analytics and Business Intelligence Strategy', targetId: '20', timestamp: '2024-12-14T08:15:00Z', type: 'comment' },
  { id: '14', userId: '5', user: 'Lê Thị Mai', action: 'viewed', target: 'Vendor Management and Procurement Policy', targetId: '21', timestamp: '2024-12-13T17:00:00Z', type: 'view' },
  { id: '15', userId: '1', user: 'Nguyễn Thị Minh Anh', action: 'shared', target: 'Innovation Management Framework', targetId: '22', timestamp: '2024-12-13T16:30:00Z', type: 'share' },
  { id: '16', userId: '3', user: 'Trần Minh Đức', action: 'uploaded', target: 'Environmental Sustainability Policy', targetId: '23', timestamp: '2024-12-13T15:45:00Z', type: 'upload' },
  { id: '17', userId: '4', user: 'Phạm Thị Hương', action: 'rated', target: 'Crisis Communication Plan', targetId: '24', timestamp: '2024-12-13T14:20:00Z', type: 'rate' },
  { id: '18', userId: '6', user: 'Nguyễn Minh Tuấn', action: 'commented on', target: 'Knowledge Management System Implementation', targetId: '25', timestamp: '2024-12-13T13:10:00Z', type: 'comment' },
  { id: '19', userId: '7', user: 'Lê Minh Tuấn', action: 'viewed', target: 'Employee Handbook 2024', targetId: '6', timestamp: '2024-12-13T12:00:00Z', type: 'view' },
  { id: '20', userId: '8', user: 'Trần Thị Lan', action: 'shared', target: 'IT Asset Management Policy', targetId: '7', timestamp: '2024-12-13T10:45:00Z', type: 'share' }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null
  });
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [activities] = useState<Activity[]>(mockActivities);
  const [searchFilters, setSearchFiltersState] = useState<SearchFilters>({
    query: '',
    tags: [],
    dateRange: {},
    department: '',
    visibility: '',
    fileType: ''
  });
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeView, setActiveView] = useState<string>('dashboard');

  const login = async (credentials: LoginCredentials) => {
    setAuthState({ isLoading: true, error: null });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        setUser(prev => ({ ...prev, isAuthenticated: true }));
        setAuthState({ isLoading: false, error: null });
      } else {
        throw new Error('Invalid credentials. Try admin / admin123');
      }
    } catch (error) {
      setAuthState({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    setSelectedDocument(null);
    setSearchFiltersState({
      query: '',
      tags: [],
      dateRange: {},
      department: '',
      visibility: '',
      fileType: ''
    });
  };

  const addDocument = (docData: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'rating' | 'totalRatings'>) => {
    const newDoc: Document = {
      ...docData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 0,
      totalRatings: 0,
      views: 0,
      comments: []
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, ...updates, updatedAt: new Date().toISOString() } : doc
    ));
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    if (selectedDocument?.id === id) {
      setSelectedDocument(null);
    }
  };

  const setSearchFilters = (filters: Partial<SearchFilters>) => {
    setSearchFiltersState(prev => ({ ...prev, ...filters }));
  };

  const rateDocument = (docId: string, rating: number) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        const newTotalRatings = doc.totalRatings + 1;
        const newRating = ((doc.rating * doc.totalRatings) + rating) / newTotalRatings;
        return { ...doc, rating: newRating, totalRatings: newTotalRatings };
      }
      return doc;
    }));
  };

  const viewDocument = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, views: doc.views + 1 } : doc
    ));
  };

  const getFilteredDocuments = () => {
    return documents.filter(doc => {
      const matchesQuery = !searchFilters.query || 
        doc.title.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchFilters.query.toLowerCase())) ||
        doc.author.toLowerCase().includes(searchFilters.query.toLowerCase());

      const matchesDepartment = !searchFilters.department || doc.department === searchFilters.department;
      const matchesVisibility = !searchFilters.visibility || doc.visibility === searchFilters.visibility;
      const matchesFileType = !searchFilters.fileType || doc.fileType === searchFilters.fileType;

      return matchesQuery && matchesDepartment && matchesVisibility && matchesFileType;
    });
  };

  const getUserDocuments = () => {
    return documents.filter(doc => doc.authorId === user.id);
  };

  const getRecentDocuments = () => {
    return [...documents]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  const getPopularDocuments = () => {
    return [...documents]
      .sort((a, b) => (b.rating * b.totalRatings + b.views) - (a.rating * a.totalRatings + a.views))
      .slice(0, 5);
  };

  return (
    <AppContext.Provider value={{
      user,
      authState,
      documents,
      activities,
      searchFilters,
      selectedDocument,
      setActiveView,
      login,
      logout,
      addDocument,
      updateDocument,
      deleteDocument,
      setSearchFilters,
      setSelectedDocument,
      rateDocument,
      viewDocument,
      getFilteredDocuments,
      getUserDocuments,
      getRecentDocuments,
      getPopularDocuments
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}