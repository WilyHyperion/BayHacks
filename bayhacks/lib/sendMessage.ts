// Define the test details interface
import { parseISO, differenceInDays } from 'date-fns';
interface TestDetails {
    testDate: string; // ISO date string
    class: string;
    unit: string;
    email: string; // recipient email
}

// Function to check the date and send emails
function checkAndNotify(testDetails: TestDetails) {
    const { testDate, class: className, unit, email,type} = testDetails;
    const testDateParsed = parseISO(testDate);
    if (type === 'tmobile'){
        contact = contact + '@tmomail.net';
    }
    else if(type == 'att'){
        contact = contact + '@txt.att.net';
    }
    else if(type == 'verizon'){
        contact = contact + '@vtext.com';
    }
    else if(type == 'sprint'){
        contact = contact + '@pm.sprint.com';
    }
    const today = new Date();
    const daysUntilTest = differenceInDays(testDateParsed, today);

    if (daysUntilTest === 7 || daysUntilTest === 1) {
        const subject = `Reminder: Test on ${className} - ${unit}`;
        const text = `This is a reminder that you have a test on ${className} - ${unit} scheduled for ${testDate}.`;

        sendEmail(email, subject, text);
    }
}

// Example usage
const testDetails: TestDetails = {
    testDate: '2024-09-14T00:00:00Z', // Example ISO date string
    class: 'Math',
    unit: 'Algebra',
    contact: 'student@example.com',
    type: 'mint',
};

checkAndNotify(testDetails);
