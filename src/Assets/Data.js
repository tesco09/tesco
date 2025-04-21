
export const BaseUrl = "https://tesco-api-psi.vercel.app";
// export const BaseUrl = "http://localhost:4000";

const id = localStorage.getItem('id');

export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/da9jxjnlv/image/upload";

export const fetchData = async () => {
    try {
        // console.log('id:', id);
        const response = await fetch(`${BaseUrl}/register/${id}`);
        const json = await response.json();
        // console.log('json:', json);
        return json;
    } catch (e) {
        console.log('error fetching Data...', e);
    }
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const addThirtyDays = async (originalDate, days) => {
    const newDate = new Date(originalDate);
    const generatedDate = newDate.setDate(originalDate.getDate() + days);
    return generatedDate;
}


export const timeAgo = (inputTime) => {
    const now = new Date();
    const past = new Date(inputTime);
    const diffInMs = now - past;


    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours <= 24) return `${hours} hr ago`;
    if (days < 7) return `${days} day ago`;

    if (weeks < 4) return `${weeks} week ago`;
    if (months < 12) return `${months} mon ago`;
    return `${years} yrs ago`;
}

export const timeDifference = (start) => {
    const startDate = new Date(start);
    const now = new Date();

    const msIn24Hours = 1000 * 60 * 60 * 24;
    const endDate = new Date(startDate.getTime() + msIn24Hours);
    const diffMs = endDate - now;

    if (diffMs <= 0) {
        return 'ready';
    }

    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const diffSeconds = Math.floor((diffMs / 1000) % 60);

    return `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
};

export const maskString = (str) => {
    // Check if the string is longer than 4 characters
    if (str.length > 4) {
        // Replace all characters except the last 4 with asterisks
        return '*'.repeat(str.length - 4) + str.slice(-4);
    }
    return str; // If the string is 4 characters or fewer, just return it as is
};
export const daysDifference = (end) => {
    const date1 = new Date();
    const date2 = new Date(end);

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}



export const sendEmail = async (email, subject, text) => {

    const url = `${BaseUrl}/send-email`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, subject, text }),
        });

        if (response.ok) {
            console.log("Email sent successfully");
        } else {
            const errorRes = await response.json();
            console.error("Failed to send email:", errorRes.message || errorRes);
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};



export const investmentOffers = [
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR3h7UJSMMPskCSl6IL7PJhUkZvGlP88Jhww&s',
        name: 'Free Plan',
        days: 5,
        profit: 10,
        amount: 0,
        lock: false
    },
    {
        id: 2,
        image: 'https://img.freepik.com/premium-vector/silver-award-sport-medal-winners-with-red-ribbon-second-place-trophy-honor-badges_599062-3670.jpg?semt=ais_hybrid&w=740',
        name: 'Silver Starter',
        days: 30,
        profit: 32,
        amount: 500,
        lock: false
    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uxOTIkvNmtxo5CdEsCtZ9liR1qLgxewdcg&s',
        name: 'Bronze Plan',
        days: 30,
        profit: 100,
        amount: 1500,
        lock: false
    },
    {
        id: 4,
        image: 'https://media.istockphoto.com/id/535484810/photo/gold-bars-on-white-background.jpg?s=612x612&w=0&k=20&c=gmjQGSrVRRemRFl7fZrxAEH_K9j9gTJOQmlIoANc56U=',
        name: 'Gold Investor',
        days: 30,
        profit: 205,
        amount: 3000,
        lock: false
    },
    {
        id: 5,
        image: 'https://marinaleksov.com/wp-content/uploads/2021/02/platinum.jpg',
        name: 'Platinum Pro',
        days: 30,
        profit: 340,
        amount: 5000,
        lock: false
    },
    {
        id: 6,
        image: 'https://cdn.pixabay.com/photo/2013/07/13/13/53/diamond-161739_640.png',
        name: 'Diamond Deluxe',
        days: 30,
        profit: 700,
        amount: 10000,
        lock: false
    },
    {
        id: 7,
        image: 'https://st.depositphotos.com/1013408/1461/i/450/depositphotos_14616183-stock-photo-green-round-cut-emerald.jpg',
        name: 'Emerald Elite',
        days: 30,
        profit: 1050,
        amount: 15000,
        lock: true
    },
    {
        id: 8,
        image: 'https://2.imimg.com/data2/SJ/ON/MY-3453542/ruby-250x250.jpg',
        name: 'Rubby Reward',
        days: 30,
        profit: 1800,
        amount: 25000,
        lock: true
    },
    {
        id: 9,
        image: 'https://static7.depositphotos.com/1006360/766/i/450/depositphotos_7662092-stock-photo-sapphire.jpg',
        name: 'Sapphire Strategic',
        days: 30,
        profit: 2600,
        amount: 35000,
        lock: true
    },
    {
        id: 10,
        image: 'https://blog.goldsupplier.com/wp-content/uploads/2024/06/a-91.png',
        name: 'Titanium Tactical',
        days: 30,
        profit: 3900,
        amount: 50000,
        lock: true
    },
    {
        id: 11,
        image: 'https://plus.unsplash.com/premium_photo-1682309580199-12b830e35008?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Growth Pro',
        days: 30,
        profit: 5300,
        amount: 65000,
        lock: true
    },
    {
        id: 12,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-biyr4mO-BnQ3or0X1ROmQf92qu1h1_k4sg&s',
        name: 'Easy Invest',
        days: 30,
        profit: 7000,
        amount: 80000,
        lock: true
    },
    {
        id: 13,
        image: 'https://plus.unsplash.com/premium_photo-1682309799578-6e685bacd4e1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW52ZXN0bWVudHxlbnwwfHwwfHx8MA%3D%3D',
        name: 'Maximize Returns',
        days: 30,
        profit: 10000,
        amount: 100000,
        lock: true
    },
];


export const pageTitles = {
    "/deposit": "Deposit",
    "/withdraw": "Withdraw",
    "/withdraw-sucess": "Withdraw Success",
    "/invite": "Invite",
    "/my-team": "My Team",
    "/team-detail": "Team Detail",
    "/detail": "Detail",
    "/invest-success": "Invest Success",
    "/progress": "Progress",
    "/notification": "Notification",
    "/dashboard": "Dashboard",
    "/deposit-history": "Deposit History",
    "/withdraw-history": "Withdraw History",
    "/profile": "Profile",
    "/edit-password": "Edit Password",
    "/about": "About",
    "/contact": "Contact",
    "/offers": "Offers",
    "/transactions": "Transactions",
    "/transaction-detail/:id": "Transaction Detail",
    "/promo-code": "Promo Code"
};
