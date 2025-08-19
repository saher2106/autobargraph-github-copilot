document.addEventListener('DOMContentLoaded', function () {
    $('#barGraphTabs a[href="#chart"]').on('shown.bs.tab', function () {
        // Example data, replace with your dynamic data
        const labels = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const incomeData = labels.map(month => {
            const input = document.getElementById(`income-${month.toLowerCase()}`);
            return input ? Number(input.value) || 0 : 0;
        });
        const expensesData = labels.map(month => {
            const input = document.getElementById(`expenses-${month.toLowerCase()}`);
            return input ? Number(input.value) || 0 : 0;
        });

        const ctx = document.getElementById('barChart').getContext('2d');
        // Destroy previous chart if exists
        if (window.barChartInstance) {
            window.barChartInstance.destroy();
        }
        window.barChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Income',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: incomeData
                    },
                    {
                        label: 'Expenses',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        data: expensesData
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Download button functionality
        document.getElementById('downloadChartBtn').onclick = function () {
            const link = document.createElement('a');
            link.href = document.getElementById('barChart').toDataURL('image/png');
            link.download = 'bar_chart.png';
            link.click();
        };
    });
});

