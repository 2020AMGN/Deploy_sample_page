// 헤더 컴포넌트 로드
document.addEventListener('DOMContentLoaded', function() {
    // 절대 경로와 상대 경로 모두 시도
    const paths = ['/components/header.html', '../components/header.html', './components/header.html'];
    
    const loadHeader = async () => {
        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const data = await response.text();
                    document.getElementById('header').innerHTML = data;
                    return;
                }
            } catch (error) {
                continue;
            }
        }
        console.error('헤더 로드 중 오류 발생: 모든 경로에서 헤더를 찾을 수 없습니다.');
    };
    
    loadHeader();
}); 