
    let jobs = [
        { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130k - $175k", description: "Build cross-platform mobile applications using React Native.", status: "All" },
        { id: 2, companyName: "Google", position: "Frontend Engineer", location: "Mountain View", type: "Full-time", salary: "$150k - $200k", description: "Design and implement highly scalable user interfaces.", status: "All" },
        { id: 3, companyName: "Amazon", position: "Backend Developer", location: "Hybrid", type: "Full-time", salary: "$120k - $160k", description: "Work on cloud-based microservices.", status: "All" },
        { id: 4, companyName: "Netflix", position: "UI Designer", location: "Remote", type: "Contract", salary: "$90k - $130k", description: "Creating stunning visual experiences.", status: "All" },
        { id: 5, companyName: "Tesla", position: "Software Engineer", location: "USA", type: "Full-time", salary: "$140k - $180k", description: "Develop software for autonomous driving.", status: "All" },
        { id: 6, companyName: "Tech Hub", position: "Full Stack Developer", location: "Dhaka", type: "Part-time", salary: "$40k - $60k", description: "Building modern web applications.", status: "All" },
        { id: 7, companyName: "Meta", position: "Product Manager", location: "Remote", type: "Full-time", salary: "$160k - $210k", description: "Define the roadmap for social products.", status: "All" },
        { id: 8, companyName: "Shopify", position: "E-commerce Specialist", location: "Canada", type: "Full-time", salary: "$100k - $140k", description: "Optimize storefronts for better conversion.", status: "All" }
    ];

    let currentTab = 'All';

    
    const jobListContainer = document.querySelector('section:last-of-type');
    const jobCountDisplay = document.getElementById('count');
    const interviewDashCount = document.getElementById('Interview');
    const rejectedDashCount = document.getElementById('Rejected');
    
    
    const totalCountDash = document.getElementById('total').nextElementSibling;

    function renderJobs() {
        let filteredJobs = jobs;
        if (currentTab !== 'All') {
            filteredJobs = jobs.filter(job => job.status === currentTab);
        }

        jobCountDisplay.innerText = `${filteredJobs.length} Jobs`;

        if (filteredJobs.length === 0) {
            jobListContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-20 w-full text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" class="w-24 mb-4 opacity-40">
                    <h2 class="text-3xl font-bold text-gray-400">No jobs Available</h2>
                    <p class="text-gray-500 text-xl">Check your other tabs!</p>
                </div>`;
            return;
        }

        jobListContainer.innerHTML = filteredJobs.map(job => `
            <div class="pt-10 card w-full lg:w-[1000px] bg-base-100 shadow-sm mb-8 border border-gray-100 p-6 rounded-2xl">
                <div class="card-body">
                    <h1 class="font-bold text-2xl text-blue-600">${job.companyName}</h1>
                    <h1 class="pb-[10px] text-2xl text-gray-600">${job.position}</h1>
                    <h1 class="text-xl text-gray-600">${job.location} • ${job.type} • ${job.salary}</h1>
                    <button class="btn btn-soft w-[150px] my-4">${job.status === 'All' ? 'Not Applied' : job.status}</button>
                    <h1 class="text-2xl text-gray-600 mb-6">${job.description}</h1>
                    <div class="flex gap-[10px]">
                        <button onclick="handleStatus(${job.id}, 'Interview')" class="btn btn-outline btn-accent">Interview</button>
                        <button onclick="handleStatus(${job.id}, 'Rejected')" class="btn btn-outline btn-error">Rejected</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function handleStatus(id, newStatus) {
        jobs = jobs.map(job => job.id === id ? { ...job, status: newStatus } : job);
        updateCounts();
        renderJobs();
    }

    function updateCounts() {
        const totalCount = jobs.length; 
        const interviewCount = jobs.filter(j => j.status === 'Interview').length;
        const rejectedCount = jobs.filter(j => j.status === 'Rejected').length;
        
    
        totalCountDash.innerText = totalCount; 
        interviewDashCount.innerText = interviewCount;
        rejectedDashCount.innerText = rejectedCount;
    }

    
    document.getElementById('all-btn').addEventListener('click', () => switchTab('All', 'all-btn'));
    document.getElementById('Interview-btn').addEventListener('click', () => switchTab('Interview', 'Interview-btn'));
    document.getElementById('Rejected-btn').addEventListener('click', () => switchTab('Rejected', 'Rejected-btn'));

    function switchTab(tab, btnId) {
        currentTab = tab;
        ['all-btn', 'Interview-btn', 'Rejected-btn'].forEach(id => {
            document.getElementById(id).classList.remove('btn-primary');
        });
        document.getElementById(btnId).classList.add('btn-primary');
        renderJobs();
    }

    renderJobs();
    updateCounts();
