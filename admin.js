document.addEventListener('DOMContentLoaded', function() {
    // In a real application, this would fetch data from an API
    // For demo purposes, we're using static data in the HTML
    
    // Additional admin functionality can be added here
    console.log('Admin dashboard loaded');
    
    // Example: Confirm before exporting data
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!confirm(`Are you sure you want to export ${this.getAttribute('data-type')} data?`)) {
                e.preventDefault();
            }
        });
    });
    
    // Example: Search functionality for tables
    const addSearchToTable = (tableId) => {
        const table = document.querySelector(`#${tableId}`);
        if (!table) return;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.style.marginBottom = '10px';
        searchInput.style.padding = '8px';
        searchInput.style.width = '100%';
        
        table.parentNode.insertBefore(searchInput, table);
        
        searchInput.addEventListener('keyup', function() {
            const filter = this.value.toLowerCase();
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    };
    
    // Initialize search for both tables
    addSearchToTable('providersTable');
    addSearchToTable('clientsTable');
});