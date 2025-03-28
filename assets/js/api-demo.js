// API 기본 URL 설정
let API_BASE_URL = 'http://localhost:8000/api';

// 서버 URL 업데이트 함수
function updateServerUrl() {
    let serverUrl = document.getElementById('serverUrl').value.trim();
    if (serverUrl) {
        // http:// 또는 https://로 시작하지 않는 경우 http:// 추가
        if (!serverUrl.startsWith('http://') && !serverUrl.startsWith('https://')) {
            serverUrl = `http://${serverUrl}`;
            document.getElementById('serverUrl').value = serverUrl; // 입력창에도 반영
        }
        
        API_BASE_URL = `${serverUrl}/api`;
        // 새로운 서버 주소로 데이터 새로고침
        fetchItems();
        // localStorage에 저장하여 페이지 새로고침해도 유지
        localStorage.setItem('apiServerUrl', serverUrl);
    }
}

// 페이지 로드 시 저장된 서버 URL 복원
document.addEventListener('DOMContentLoaded', () => {
    const savedUrl = localStorage.getItem('apiServerUrl');
    if (savedUrl) {
        document.getElementById('serverUrl').value = savedUrl;
        API_BASE_URL = `${savedUrl}/api`;
    }
    fetchItems();
});

// 항목 목록 가져오기
async function fetchItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/items`);
        const data = await response.json();
        displayItems(data);
    } catch (error) {
        console.error('항목 목록을 가져오는 중 오류 발생:', error);
    }
}

// 항목 추가하기
async function addItem(item) {
    try {
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
        
        if (response.ok) {
            fetchItems();
            document.getElementById('addItemForm').reset();
        } else {
            console.error('서버 응답 오류:', await response.text());
        }
    } catch (error) {
        console.error('항목 추가 중 오류 발생:', error);
        alert('항목 추가 중 오류가 발생했습니다. 개발자 도구의 콘솔을 확인해주세요.');
    }
}

// 항목 삭제하기
async function deleteItem(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchItems(); // 목록 새로고침
        }
    } catch (error) {
        console.error('항목 삭제 중 오류 발생:', error);
    }
}

// 항목 목록 표시
function displayItems(items) {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = `
        <div class="items-grid">
            ${items.map(item => `
                <div class="item-card">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button onclick="deleteItem(${item.id})" class="btn btn-danger">삭제</button>
                </div>
            `).join('')}
        </div>
    `;
}

// 폼 제출 이벤트 처리
document.getElementById('addItemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    
    addItem({ name, description });
});

// 초기 항목 목록 로드
fetchItems(); 