import Layout from './components/layout';
import Patients from './pages/patients';
import Appointments from './pages/appointments';

export default [
    {
        path: "/", component: Layout, children: [
            {path: "/patients", component: Patients},
            {path: "/appointments", component: Appointments},
        ]
    }
]
    
