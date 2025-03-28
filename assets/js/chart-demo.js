// 차트 객체 저장용 변수들
let barChart, lineChart, pieChart, doughnutChart;

// 샘플 데이터
const sampleData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    values: [65, 59, 80, 81, 56, 55]
};

// 랜덤 데이터 생성 함수
function generateRandomData(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

// 막대 그래프 초기화
function initBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.labels,
            datasets: [{
                label: '월별 데이터',
                data: sampleData.values,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 선 그래프 초기화
function initLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sampleData.labels,
            datasets: [{
                label: '월별 추이',
                data: sampleData.values,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true
        }
    });
}

// 파이 차트 초기화
function initPieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['빨강', '파랑', '노랑', '초록', '보라'],
            datasets: [{
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

// 도넛 차트 초기화
function initDoughnutChart() {
    const ctx = document.getElementById('doughnutChart').getContext('2d');
    doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

// 차트 업데이트 함수들
function updateBarChart() {
    barChart.data.datasets[0].data = generateRandomData(6);
    barChart.update();
}

function updateLineChart() {
    lineChart.data.datasets[0].data = generateRandomData(6);
    lineChart.update();
}

function updatePieChart() {
    pieChart.data.datasets[0].data = generateRandomData(5);
    pieChart.update();
}

function updateDoughnutChart() {
    doughnutChart.data.datasets[0].data = generateRandomData(5);
    doughnutChart.update();
}

// 페이지 로드 시 차트 초기화
document.addEventListener('DOMContentLoaded', function() {
    initBarChart();
    initLineChart();
    initPieChart();
    initDoughnutChart();
}); 