function generate() {
    const pageId = document.getElementById('pageId').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!pageId) {
        resultDiv.innerHTML = `
            <div class="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg">
                <p class="text-slate-700 font-medium">Please enter a valid Notion Page ID or link.</p>
            </div>
        `;
        return;
    }
    
    // Simulate processing
    resultDiv.innerHTML = `
        <div class="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg">
            <div class="flex items-center justify-center mb-4">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 text-center mb-2">Generating your site...</h3>
            <p class="text-slate-600 text-center">This usually takes a few seconds.</p>
        </div>
    `;
    
    // Simulate a delay and show success message
    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-xl">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">Site Ready!</h3>
                    <p class="text-slate-600 mb-6 max-w-md mx-auto">
                        Your Notion page is now live at:
                    </p>
                    <div class="bg-white/80 border border-slate-200 rounded-xl p-4 mb-6 font-mono text-slate-800 break-all">
                        https://notionlite.site/${encodeURIComponent(pageId)}
                    </div>
                    <button class="h-12 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium px-8 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Open Site
                    </button>
                </div>
            </div>
        `;
    }, 2000);
}
