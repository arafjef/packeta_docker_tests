
------------------------------------------------------------------------
---------------------------- DOCKER RUNNING ----------------------------
------------------------------------------------------------------------

docker compose build

docker compose up -d

docker exec -it playwright-tests bash



------------------------------------------------------------------------
----------------------------- TEST RUNNING -----------------------------
------------------------------------------------------------------------


# Playwright testy 

- pouštění z příkazové řádky Docker containeru
- zkontroluj, že jsi v adresáři: /app


npx playwright test ./tests/zasilkovna.spec.js


# Postman testy

- pouštění z příkazové řádky Docker containeru
- zkontroluj, že jsi v adresáři: /app

npx newman run ./postman/packeta.json \
  --environment ./postman/packeta_env.json \
  --reporters cli,html \
  --reporter-html-export ./postman/report.html


------------------------------------------------------------------------
------------------------------ CI pipeline -----------------------------
------------------------------------------------------------------------

- .github/workflows/tests.yml 
- CI po každém push nebo pull requestu do repozitáře spustí automaticky testy z /tests a /postman


# Packeta Docker Tests
![CI](https://github.com/arafjef/packeta_docker_tests/actions/workflows/tests.yml/badge.svg)



------------------------------------------------------------------------
------------------------------------------------------------------------
