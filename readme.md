각 폴더가 하나의 프로젝트로 취급되서 동작 할 예정 !

python -m venv dev-env

dev-env\Scripts\activate.bat

pip install -r requirements.txt

pip freeze > requirements.txt


# https://2020amgn.github.io/Deploy_sample_page

## 모두의창업 MVP

- [SiteDock MVP](https://2020amgn.github.io/Deploy_sample_page/demos/sitedock/) · [초기 시안](https://2020amgn.github.io/Deploy_sample_page/demos/sitedock-preview/)
- [초원 비행 관제실](https://2020amgn.github.io/Deploy_sample_page/demos/meadow-control/)

GitHub Pages는 `main` 브랜치의 루트에서 배포합니다. SiteDock 두 버전은 브라우저 실행 파일과 자산을 각각 `demos/sitedock/`과 `demos/sitedock-preview/`에 둡니다.

초원 비행 관제실을 갱신하려면 원본 `drone-control`에서 `npm ci`와 `npm run build -- --base=./`를 실행한 후 `dist/`의 내용으로 `demos/meadow-control/`을 갱신합니다. 상대 경로로 빌드해야 GitHub Pages의 프로젝트 하위 경로에서 자산을 불러올 수 있습니다.
