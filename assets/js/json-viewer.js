let jsonData = null;
let currentProducts = [];
let currentCategories = [];

// JSON 데이터 로드
async function loadJsonData() {
    try {
        // 절대 경로와 상대 경로 모두 시도
        const paths = ['../data/sample.json'];
        let response = null;
        
        for (const path of paths) {
            try {
                response = await fetch(path);
                if (response.ok) break;
            } catch (e) {
                continue;
            }
        }
        
        if (!response || !response.ok) {
            throw new Error('JSON 파일을 찾을 수 없습니다.');
        }
        
        jsonData = await response.json();
        currentProducts = [...jsonData.products];
        currentCategories = [...jsonData.categories];
        displayData();
    } catch (error) {
        console.error('JSON 데이터 로드 중 오류 발생:', error);
    }
}

// 데이터 표시
function displayData() {
    displayProducts();
    displayCategories();
}

// 제품 목록 표시
function displayProducts() {
    const productsTable = document.getElementById('productsTable');
    productsTable.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>재고</th>
                </tr>
            </thead>
            <tbody>
                ${currentProducts.map(product => `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${formatPrice(product.price)}</td>
                        <td>${product.category}</td>
                        <td>${product.stock}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// 카테고리 목록 표시
function displayCategories() {
    const categoriesTable = document.getElementById('categoriesTable');
    categoriesTable.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>설명</th>
                </tr>
            </thead>
            <tbody>
                ${currentCategories.map(category => `
                    <tr>
                        <td>${category.id}</td>
                        <td>${category.name}</td>
                        <td>${category.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// 가격 포맷팅
function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

// 검색 기능
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    currentProducts = jsonData.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    displayProducts();
});

// 카테고리 필터
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    const category = e.target.value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    currentProducts = jsonData.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });
    
    displayProducts();
});

// 정렬 기능
document.getElementById('sortSelect').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
        currentProducts.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
        displayProducts();
    }
});

// 초기 데이터 로드
loadJsonData(); 