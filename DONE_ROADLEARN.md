# RoadLearn — 5 Chantiers TERMINES
Date : 2026-05-11

## Chantier 1 — Design moderne OK
HTML : button:focus-visible/input:focus-visible -> outline bleu 2px (WCAG AA)
HTML : .answer-btn transition background/border/transform 0.15s, hover scale 1.005
HTML : .shadow-card box-shadow subtil, scrollbar custom 4px
JSX  : focus-visible:outline-2 + hover:scale-[1.005] + active:scale-[0.97] sur boutons quiz/theory/continue

## Chantier 2 — i18n complete FR+EN+ES+5 autres OK
HTML : TRANSLATIONS 8 langues x nav/lesson/result/lb/badge/tts/settings
JSX  : TRANSLATIONS 8 langues x nav/lesson/result/lb/badges/home/setup/profile/levels
TTS  : SpeechSynthesisUtterance.lang + scoring voix (HTML), lang via utterance.lang (JSX)
Zero chaine hardcodee : toutes remplacees par t.*

## Chantier 3 — Questions coherentes avec lecon+niveau OK
detectTopicKey(levelName) : 50+ regles, mappe chaque niveau au bon pool (HTML+JSX)
getDifficultyFromSection(sectionTitle) : retourne 1/2/3 (HTML+JSX)
pickQuestions / generateMockSteps : filtre par difficulte avant pioche

## Chantier 4 — Pool 15-25Q + seen-questions + Fisher-Yates OK
HTML : getSeenIndices/markSeen par indice, cle "lang:topicKey", reset auto si tout vu
JSX  : getSeenQuestions/markQuestionsSeen par texte, limite 100/topic
shuffleAnswers : melange les choix + met a jour l'index correct (HTML+JSX)
Fisher-Yates : implementation identique dans les deux fichiers

## Chantier 5 — Zero IA runtime OK
HTML : MOCK_DB (FR, 30+ topics), MOCK_DB_MULTI.en+es (5 topics x 10Q)
JSX  : MOCK_DB (FR, 30+ topics), MOCK_DB_EN+MOCK_DB_ES (5 topics x 15Q + difficulty/topicTags)
generateMockSteps purement algorithmique. API Anthropic optionnelle (fallback auto).

## Fichiers modifies
- RoadLearn.html : +400 lignes (CSS, TRANSLATIONS 8L, MOCK_DB_MULTI, helpers, strings t.*)
- RoadLearn.jsx  : deja avance + sync Chantier 1 (focus-visible, transitions boutons quiz)
- DONE_ROADLEARN.md + PROGRESS_ROADLEARN.md : crees 2026-05-11
