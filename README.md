# AttendIQ — Employee Attendance & Leave Management System

[![Angular](https://img.shields.io/badge/Angular-17-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

AttendIQ is a comprehensive Angular-based web application designed to streamline employee attendance tracking and leave management processes. Built with modern web technologies, it provides an intuitive interface for administrators, HR personnel, and employees to manage daily attendance, submit leave requests, and approve or deny leave applications efficiently.

## Features

- **Dashboard Analytics**: Real-time attendance statistics and insights for better workforce management.
- **Employee Management**: Comprehensive employee listing with detailed profiles and management capabilities.
- **Attendance Tracking**: Daily attendance logging with status indicators (Present, Absent, Late).
- **Leave Management**: Streamlined leave request submission and approval workflow.
- **Role-Based Access Control**: Secure access levels for Admin, HR, and Employee roles.
- **Responsive Design**: Optimized for desktop and mobile devices using Angular Material.

## Tech Stack

- **Frontend**: Angular 17, TypeScript, SCSS
- **UI Library**: Angular Material
- **Backend**: JSON Server (for development and testing)
- **Build Tools**: Angular CLI
- **Styling**: SCSS with Material Design components

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v17)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd attendiq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the mock backend server:
   ```bash
   npm run json-server
   ```

2. In a new terminal, start the Angular development server:
   ```bash
   ng serve -o
   ```

3. Open your browser and navigate to `http://localhost:4200`.

## Development

### Running Tests
```bash
ng test
```

### Building for Production
```bash
ng build --prod
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact the development team.
