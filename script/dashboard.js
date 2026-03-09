let allData = [];

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            allData = json.data;
            displayIssues(allData);
            updateCount(allData.length);
        })
};


// // {
// // "id": 1,
// // "title": "Fix navigation menu on mobile devices",
// // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// // "status": "open",
// // "labels": [2 items],
// // "priority": "high",
// // "author": "john_doe",
// // "assignee": "jane_smith",
// // "createdAt": "2024-01-15T10:30:00Z",
// // "updatedAt": "2024-01-15T10:30:00Z"
// // },


const displayIssues = (issues) => {
    const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";

    // priority colors
    const priorityStyles = {
        high: {
            bg: 'bg-[#FEECEC]',
            text: 'text-[#EF4444]'
        },
        medium: {
            bg: 'bg-[#FFF6D1]',
            text: 'text-[#F59E0B]'
        },
        low: {
            bg: 'bg-[#EEEFF2]',
            text: 'text-[#9CA3AF]'
        }
    };


    issues.forEach(issue => {
        const card = document.createElement("div");

        // Priority bage select
        const style = priorityStyles[issue.priority.toLowerCase()] || priorityStyles.low;

        // Card border color select
        const borderColorClass = issue.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]';

        // card design
        card.className = `bg-white rounded border-t-4 ${borderColorClass} shadow-md`;

        card.innerHTML = `
    <div class="p-4 space-y-3 border-b border-[#E4E4E7]">
        <div class="flex justify-between items-center">
            <img class="h-full" src="./assets/${issue.status === 'open' ? 'Open-Status.png' : ' Closed- Status .png'}" alt="">
            
            <div class="${style.bg} ${style.text} rounded-full py-[6px] px-[25px] font-bold text-xs uppercase">
                ${issue.priority}
            </div>
        </div>
        
        <div>
            <h2 class="text-sm font-semibold text-[#1F2937]">${issue.title}</h2>
            <p class="text-xs text-[#64748B]">${issue.description.slice(0, 70)}...</p>
        </div>
        
        <div class="flex justify-start gap-1">
            ${issue.labels.map(label => `
                <div class="flex gap-[2px] items-center rounded-full bg-[#EFF6FF] border border-[#BFDBFE] py-[4px] px-2">
                    <p class="text-[10px] font-medium text-[#3B82F6] uppercase">${label}</p>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="text-xs text-[#64748B] p-4">
        <p>#${issue.id} by ${issue.author}</p>
        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
    </div>
`;
        issueContainer.append(card);
    });
};

const updateCount = (count) => {
    const countElement = document.getElementById("issue-count");
    if (countElement) countElement.innerText = `${count} Issues`;
};

// Buttons click handler
const buttons = document.querySelectorAll(".btn-base");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("bg-[#4A00FF]", "text-white"));
        btn.classList.add("bg-[#4A00FF]", "text-white");

        const status = btn.innerText.toLowerCase();
        const filtered = status === "all" ? allData : allData.filter(item => item.status === status);

        displayIssues(filtered);
        updateCount(filtered.length);
    });
});

loadIssues();