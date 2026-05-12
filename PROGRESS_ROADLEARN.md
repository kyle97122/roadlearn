# PROGRESS — RoadLearn
Derniere mise a jour : 2026-05-11

## Statut global : TOUS LES CHANTIERS TERMINES + JSX SYNCE

| Chantier | Description | HTML | JSX | Statut |
|----------|-------------|------|-----|--------|
| 1 | Design (focus-visible WCAG AA, transitions, scrollbar, shadow) | OK | OK | TERMINE |
| 2 | i18n complete 8 langues, zero hardcode FR | OK | OK | TERMINE |
| 3 | Questions coherentes par lecon+niveau (detectTopicKey, getDifficulty) | OK | OK | TERMINE |
| 4 | Pool 15-25Q, seen-questions localStorage, Fisher-Yates, answers shuffled | OK | OK | TERMINE |
| 5 | Zero IA runtime, tout pre-ecrit (MOCK_DB FR, MOCK_DB_MULTI/EN/ES) | OK | OK | TERMINE |

## Detail par fichier

### RoadLearn.html (CDN React, no build)
- CSS : focus-visible 2px bleu, .answer-btn transitions, .shadow-card, scrollbar 4px
- TRANSLATIONS : 8 langues x tous les namespaces (nav/lesson/result/lb/badge/tts/settings)
- MOCK_DB_MULTI : EN + ES, 5 topics x 10 questions chacun
- Helpers : shuffle, getSeenIndices, markSeen, shuffleAnswers, getLangContent, pickQuestions
- generateMockSteps : lang-aware, difficulty-filtered, unseen-first

### RoadLearn.jsx (React + lucide-react, build step)
- TRANSLATIONS : 8 langues x tous les namespaces (nav/lesson/result/lb/badges/home/setup/profile/levels)
- MOCK_DB_EN + MOCK_DB_ES : 5 topics x 15 questions chacun avec difficulty + topicTags
- getSeenQuestions / markQuestionsSeen : Set par texte de question, limite 100
- generateMockSteps : lang-aware, difficulty-filtered, Fisher-Yates
- Chantier 1 JSX : focus-visible + hover:scale + active:scale sur boutons quiz + theory
- generateMockSteps appele avec lang : generateMockSteps(lv.name, rm.sections[secIdx].title, lang)

## Fichiers crees
- DONE_ROADLEARN.md (2026-05-11)
- PROGRESS_ROADLEARN.md (2026-05-11)
