import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Trophy,
  Medal,
  User,
  ArrowLeft,
  X,
  Check,
  Lock,
  Zap,
  Flame,
  ChevronRight,
  AlertCircle,
  Loader2,
  Heart,
  Sparkles,
  BookOpen,
  Code2,
  Target,
  Eye,
  EyeOff,
  Edit2,
  Key,
  RefreshCw,
  Moon,
  Sun,
  Settings,
  Bell,
  Share2,
  Volume2,
  Calendar,
  Repeat,
} from "lucide-react";

// ─── Clé de stockage localStorage ───────────────────────────────────────────
const STORAGE_KEY = "roadlearn_v2";
const GOOGLE_CLIENT_ID = "66156942542-15ia2unhu3o9bnvn7v5q88c6k1nc3kd1.apps.googleusercontent.com";
const L_GOOGLE = {
  fr:{signIn:"Se connecter avec Google",signOut:"Déconnexion",connected:"Connecté",setup:"Configurez votre clé Gemini gratuite"},
  en:{signIn:"Sign in with Google",signOut:"Sign out",connected:"Connected",setup:"Set up your free Gemini key"},
  es:{signIn:"Iniciar sesión con Google",signOut:"Cerrar sesión",connected:"Conectado",setup:"Configura tu clave Gemini gratuita"},
  pt:{signIn:"Entrar com Google",signOut:"Sair",connected:"Conectado",setup:"Configure sua chave Gemini gratuita"},
  de:{signIn:"Mit Google anmelden",signOut:"Abmelden",connected:"Verbunden",setup:"Richten Sie Ihren kostenlosen Gemini-Schlüssel ein"},
  it:{signIn:"Accedi con Google",signOut:"Disconnetti",connected:"Connesso",setup:"Configura la tua chiave Gemini gratuita"},
  nl:{signIn:"Inloggen met Google",signOut:"Uitloggen",connected:"Verbonden",setup:"Stel uw gratis Gemini-sleutel in"},
  ja:{signIn:"Googleでログイン",signOut:"ログアウト",connected:"接続済み",setup:"無料のGeminiキーを設定"},
};

// ─── Traductions ──────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  fr: {
    nav: { home:"Accueil", lb:"Classement", badges:"Badges", profile:"Profil", settings:"Paramètres" },
    settings: { title:"Paramètres", lang:"Langue", appearance:"Apparence", darkMode:"Mode sombre", notifications:"Notifications", notifGlobal:"Activer les notifications", notifLesson:"Rappels de leçons", notifStreak:"Rappels de série", notifLb:"Mises à jour classement", notifTime:"Heure du rappel", notifPerm:"Autoriser les notifications", version:"version" },
    home:{ xpLabel:"XP", streakLabel:"Jours", lvlLabel:"Niv.", chooseRoad:"Choisis ta voie", resume:"REPRENDRE", daily:"DÉFI DU JOUR", dailyQ:"Question du jour", dailyDone:"Défi du jour complété !", dailyCorrect:"+20 XP gagnés 🎉", dailyWrong:"+5 XP · Reviens demain", ok:"✅ Bonne réponse ! +20 XP", nok:"❌ Pas tout à fait… +5 XP", activity:"ACTIVITÉ", streakCurrent:"Série actuelle", streakBest:"Meilleure série", activeDays:"Jours actifs", ago60:"Il y a 60j", today:"Aujourd'hui" },
    profile:{ title:"Profil", resetData:"Réinitialiser", save:"Sauvegarder", cancel:"Annuler" },
    result:{ xpGained:"points gagnés", correct:"Bonnes", accuracy:"Précision", lives:"Vies", continueBtn:"Continuer", homeBtn:"Accueil", perfect:"Parfait !", levelDone:"Niveau terminé !", tryAgain:"Essaie encore !", courage:"Courage !", keep:"Continue comme ça !", allCorrect:"100% correct !", badgesAvail:"Badges disponibles" },
    lesson:{ theory:"Théorie", quiz:"Quiz", code:"Code", challenge:"Défi", loading:"Génération du cours…", loadingWait:"Cela peut prendre quelques secondes", errorTitle:"Erreur de génération", retry:"Réessayer", back:"Retour", lessonOf:"Leçon", questionOf:"Question", understood:"J'ai compris →", goodAnswer:"✅ Bonne réponse !", wrongAnswer:"❌ Pas tout à fait…", seeResult:"Voir le résultat →", finish:"Terminer →", continueBtn:"Continuer →" },
    tts:{ listen:"Écouter", stop:"Arrêter", tip:"Rappel de cours" },
    lb:{ title:"Classement", you:"• Toi" },
    badges:{ title:"Mes badges", unlocked:"débloqué", unlockedP:"débloqués", unlockedLabel:"Débloqué" },
    levels:{ theory:"Théorie + Quiz", code:"Code", quiz:"Quiz", replay:"· Rejouer", levels:"niveaux" },
    setup:{ label:"Comment tu t'appelles ?", optional:"(optionnel)", placeholder:"Ex : Alex", startBtn:"Commencer gratuitement →", noKey:"Cours générés localement · Aucune clé API nécessaire", skip:"Passer →" },
    profile2:{ lvl:"Niveau", roadmaps:"Roadmaps", levels:"Niveaux", theme:"Thème", dark:"sombre", light:"clair", apiKey:"Clé API Anthropic", modify:"Modifier", cancel:"Annuler", save:"Enregistrer", notConfigured:"Non configurée", progression:"PROGRESSION", params:"PARAMÈTRES", roadmapsAvail:"ROADMAPS DISPONIBLES" },
  },
  en: {
    nav: { home:"Home", lb:"Ranking", badges:"Badges", profile:"Profile", settings:"Settings" },
    settings: { title:"Settings", lang:"Language", appearance:"Appearance", darkMode:"Dark mode", notifications:"Notifications", notifGlobal:"Enable notifications", notifLesson:"Lesson reminders", notifStreak:"Streak reminders", notifLb:"Leaderboard updates", notifTime:"Reminder time", notifPerm:"Allow notifications", version:"version" },
    home:{ xpLabel:"XP", streakLabel:"Days", lvlLabel:"Lvl.", chooseRoad:"Choose your path", resume:"CONTINUE", daily:"DAILY CHALLENGE", dailyQ:"Question of the day", dailyDone:"Daily challenge complete!", dailyCorrect:"+20 XP earned 🎉", dailyWrong:"+5 XP · Come back tomorrow", ok:"✅ Correct! +20 XP", nok:"❌ Not quite… +5 XP", activity:"ACTIVITY", streakCurrent:"Current streak", streakBest:"Best streak", activeDays:"Active days", ago60:"60 days ago", today:"Today" },
    profile:{ title:"Profile", resetData:"Reset data", save:"Save", cancel:"Cancel" },
    result:{ xpGained:"points earned", correct:"Correct", accuracy:"Accuracy", lives:"Lives", continueBtn:"Continue", homeBtn:"Home", perfect:"Perfect!", levelDone:"Level complete!", tryAgain:"Try again!", courage:"Keep going!", keep:"Keep it up!", allCorrect:"100% correct!", badgesAvail:"Badges available" },
    lesson:{ theory:"Theory", quiz:"Quiz", code:"Code", challenge:"Challenge", loading:"Loading lesson…", loadingWait:"This may take a few seconds", errorTitle:"Loading error", retry:"Retry", back:"Back", lessonOf:"Lesson", questionOf:"Question", understood:"Got it →", goodAnswer:"✅ Correct!", wrongAnswer:"❌ Not quite…", seeResult:"See result →", finish:"Finish →", continueBtn:"Continue →" },
    tts:{ listen:"Listen", stop:"Stop", tip:"Course reminder" },
    lb:{ title:"Ranking", you:"• You" },
    badges:{ title:"My badges", unlocked:"unlocked", unlockedP:"unlocked", unlockedLabel:"Unlocked" },
    levels:{ theory:"Theory + Quiz", code:"Code", quiz:"Quiz", replay:"· Replay", levels:"levels" },
    setup:{ label:"What's your name?", optional:"(optional)", placeholder:"E.g. Alex", startBtn:"Start for free →", noKey:"Lessons generated locally · No API key needed", skip:"Skip →" },
    profile2:{ lvl:"Level", roadmaps:"Roadmaps", levels:"Levels", theme:"Theme", dark:"dark", light:"light", apiKey:"Anthropic API Key", modify:"Edit", cancel:"Cancel", save:"Save", notConfigured:"Not configured", progression:"PROGRESS", params:"SETTINGS", roadmapsAvail:"AVAILABLE ROADMAPS" },
  },
  es: {
    nav: { home:"Inicio", lb:"Ranking", badges:"Logros", profile:"Perfil", settings:"Ajustes" },
    settings: { title:"Ajustes", lang:"Idioma", appearance:"Apariencia", darkMode:"Modo oscuro", notifications:"Notificaciones", notifGlobal:"Activar notificaciones", notifLesson:"Recordatorios de lecciones", notifStreak:"Recordatorios de racha", notifLb:"Actualizaciones del ranking", notifTime:"Hora del recordatorio", notifPerm:"Permitir notificaciones", version:"versión" },
    home:{ xpLabel:"XP", streakLabel:"Días", lvlLabel:"Niv.", chooseRoad:"Elige tu camino", resume:"CONTINUAR", daily:"DESAFÍO DEL DÍA", dailyQ:"Pregunta del día", dailyDone:"¡Desafío del día completado!", dailyCorrect:"+20 XP ganados 🎉", dailyWrong:"+5 XP · Vuelve mañana", ok:"✅ ¡Correcto! +20 XP", nok:"❌ No del todo… +5 XP", activity:"ACTIVIDAD", streakCurrent:"Racha actual", streakBest:"Mejor racha", activeDays:"Días activos", ago60:"Hace 60 días", today:"Hoy" },
    profile:{ title:"Perfil", resetData:"Reiniciar", save:"Guardar", cancel:"Cancelar" },
    result:{ xpGained:"puntos ganados", correct:"Correctas", accuracy:"Precisión", lives:"Vidas", continueBtn:"Continuar", homeBtn:"Inicio", perfect:"¡Perfecto!", levelDone:"¡Nivel completado!", tryAgain:"¡Inténtalo de nuevo!", courage:"¡Ánimo!", keep:"¡Sigue así!", allCorrect:"¡100% correcto!", badgesAvail:"Medallas disponibles" },
    lesson:{ theory:"Teoría", quiz:"Quiz", code:"Código", challenge:"Desafío", loading:"Cargando lección…", loadingWait:"Esto puede tardar unos segundos", errorTitle:"Error de carga", retry:"Reintentar", back:"Volver", lessonOf:"Lección", questionOf:"Pregunta", understood:"Entendido →", goodAnswer:"✅ ¡Correcto!", wrongAnswer:"❌ No del todo…", seeResult:"Ver resultado →", finish:"Terminar →", continueBtn:"Continuar →" },
    tts:{ listen:"Escuchar", stop:"Parar", tip:"Recordatorio del curso" },
    lb:{ title:"Clasificación", you:"• Tú" },
    badges:{ title:"Mis medallas", unlocked:"desbloqueada", unlockedP:"desbloqueadas", unlockedLabel:"Desbloqueada" },
    levels:{ theory:"Teoría + Quiz", code:"Código", quiz:"Quiz", replay:"· Repetir", levels:"niveles" },
    setup:{ label:"¿Cómo te llamas?", optional:"(opcional)", placeholder:"Ej: Álex", startBtn:"Comenzar gratis →", noKey:"Lecciones generadas localmente · Sin clave API", skip:"Saltar →" },
    profile2:{ lvl:"Nivel", roadmaps:"Rutas", levels:"Niveles", theme:"Tema", dark:"oscuro", light:"claro", apiKey:"Clave API Anthropic", modify:"Editar", cancel:"Cancelar", save:"Guardar", notConfigured:"No configurada", progression:"PROGRESO", params:"AJUSTES", roadmapsAvail:"RUTAS DISPONIBLES" },
  },
  pt: {
    nav: { home:"Início", lb:"Ranking", badges:"Medalhas", profile:"Perfil", settings:"Ajustes" },
    settings: { title:"Ajustes", lang:"Idioma", appearance:"Aparência", darkMode:"Modo escuro", notifications:"Notificações", notifGlobal:"Ativar notificações", notifLesson:"Lembretes de lições", notifStreak:"Lembretes de sequência", notifLb:"Atualizações do ranking", notifTime:"Hora do lembrete", notifPerm:"Permitir notificações", version:"versão" },
    home:{ xpLabel:"XP", streakLabel:"Dias", lvlLabel:"Niv.", chooseRoad:"Escolha seu caminho", resume:"CONTINUAR", daily:"DESAFIO DO DIA", dailyQ:"Pergunta do dia", dailyDone:"Desafio do dia concluído!", dailyCorrect:"+20 XP ganhos 🎉", dailyWrong:"+5 XP · Volte amanhã", ok:"✅ Correto! +20 XP", nok:"❌ Não exatamente… +5 XP", activity:"ATIVIDADE", streakCurrent:"Sequência atual", streakBest:"Melhor sequência", activeDays:"Dias ativos", ago60:"60 dias atrás", today:"Hoje" },
    profile:{ title:"Perfil", resetData:"Reiniciar", save:"Salvar", cancel:"Cancelar" },
    result:{ xpGained:"pontos ganhos", correct:"Corretas", accuracy:"Precisão", lives:"Vidas", continueBtn:"Continuar", homeBtn:"Início", perfect:"Perfeito!", levelDone:"Nível concluído!", tryAgain:"Tente de novo!", courage:"Coragem!", keep:"Continue assim!", allCorrect:"100% correto!", badgesAvail:"Medalhas disponíveis" },
    lesson:{ theory:"Teoria", quiz:"Quiz", code:"Código", challenge:"Desafio", loading:"Carregando lição…", loadingWait:"Isso pode levar alguns segundos", errorTitle:"Erro de carregamento", retry:"Tentar novamente", back:"Voltar", lessonOf:"Lição", questionOf:"Questão", understood:"Entendi →", goodAnswer:"✅ Correto!", wrongAnswer:"❌ Não exatamente…", seeResult:"Ver resultado →", finish:"Terminar →", continueBtn:"Continuar →" },
    tts:{ listen:"Ouvir", stop:"Parar", tip:"Lembrete do curso" },
    lb:{ title:"Ranking", you:"• Você" },
    badges:{ title:"Minhas medalhas", unlocked:"desbloqueada", unlockedP:"desbloqueadas", unlockedLabel:"Desbloqueada" },
    levels:{ theory:"Teoria + Quiz", code:"Código", quiz:"Quiz", replay:"· Repetir", levels:"níveis" },
    setup:{ label:"Qual é o seu nome?", optional:"(opcional)", placeholder:"Ex: Alex", startBtn:"Começar grátis →", noKey:"Lições geradas localmente · Sem chave API", skip:"Pular →" },
    profile2:{ lvl:"Nível", roadmaps:"Trilhas", levels:"Níveis", theme:"Tema", dark:"escuro", light:"claro", apiKey:"Chave API Anthropic", modify:"Editar", cancel:"Cancelar", save:"Salvar", notConfigured:"Não configurada", progression:"PROGRESSO", params:"CONFIGURAÇÕES", roadmapsAvail:"TRILHAS DISPONÍVEIS" },
  },
  de: {
    nav: { home:"Startseite", lb:"Rangliste", badges:"Abzeichen", profile:"Profil", settings:"Einstellungen" },
    settings: { title:"Einstellungen", lang:"Sprache", appearance:"Erscheinungsbild", darkMode:"Dunkelmodus", notifications:"Benachrichtigungen", notifGlobal:"Benachrichtigungen aktivieren", notifLesson:"Lektionserinnerungen", notifStreak:"Strähnen-Erinnerungen", notifLb:"Ranglisten-Updates", notifTime:"Erinnerungszeit", notifPerm:"Benachrichtigungen erlauben", version:"Version" },
    home:{ xpLabel:"XP", streakLabel:"Tage", lvlLabel:"Lv.", chooseRoad:"Wähle deinen Weg", resume:"FORTSETZEN", daily:"TAGESAUFGABE", dailyQ:"Frage des Tages", dailyDone:"Tagesaufgabe erledigt!", dailyCorrect:"+20 XP verdient 🎉", dailyWrong:"+5 XP · Komm morgen wieder", ok:"✅ Richtig! +20 XP", nok:"❌ Nicht ganz… +5 XP", activity:"AKTIVITÄT", streakCurrent:"Aktuelle Serie", streakBest:"Beste Serie", activeDays:"Aktive Tage", ago60:"Vor 60 Tagen", today:"Heute" },
    profile:{ title:"Profil", resetData:"Zurücksetzen", save:"Speichern", cancel:"Abbrechen" },
    result:{ xpGained:"Punkte verdient", correct:"Richtig", accuracy:"Genauigkeit", lives:"Leben", continueBtn:"Weiter", homeBtn:"Startseite", perfect:"Perfekt!", levelDone:"Level abgeschlossen!", tryAgain:"Nochmal versuchen!", courage:"Weiter so!", keep:"Weiter so!", allCorrect:"100% richtig!", badgesAvail:"Abzeichen verfügbar" },
    lesson:{ theory:"Theorie", quiz:"Quiz", code:"Code", challenge:"Herausforderung", loading:"Lektion wird geladen…", loadingWait:"Das kann einige Sekunden dauern", errorTitle:"Ladefehler", retry:"Erneut versuchen", back:"Zurück", lessonOf:"Lektion", questionOf:"Frage", understood:"Verstanden →", goodAnswer:"✅ Richtig!", wrongAnswer:"❌ Nicht ganz…", seeResult:"Ergebnis ansehen →", finish:"Beenden →", continueBtn:"Weiter →" },
    tts:{ listen:"Anhören", stop:"Stopp", tip:"Kurserinnerung" },
    lb:{ title:"Rangliste", you:"• Du" },
    badges:{ title:"Meine Abzeichen", unlocked:"freigeschaltet", unlockedP:"freigeschaltet", unlockedLabel:"Freigeschaltet" },
    levels:{ theory:"Theorie + Quiz", code:"Code", quiz:"Quiz", replay:"· Wiederholen", levels:"Level" },
    setup:{ label:"Wie heißt du?", optional:"(optional)", placeholder:"z.B. Alex", startBtn:"Kostenlos starten →", noKey:"Lektionen lokal generiert · Kein API-Schlüssel nötig", skip:"Überspringen →" },
    profile2:{ lvl:"Level", roadmaps:"Lernpfade", levels:"Level", theme:"Thema", dark:"dunkel", light:"hell", apiKey:"Anthropic API-Schlüssel", modify:"Bearbeiten", cancel:"Abbrechen", save:"Speichern", notConfigured:"Nicht konfiguriert", progression:"FORTSCHRITT", params:"EINSTELLUNGEN", roadmapsAvail:"VERFÜGBARE LERNPFADE" },
  },
  it: {
    nav: { home:"Home", lb:"Classifica", badges:"Medaglie", profile:"Profilo", settings:"Impostazioni" },
    settings: { title:"Impostazioni", lang:"Lingua", appearance:"Aspetto", darkMode:"Modalità scura", notifications:"Notifiche", notifGlobal:"Attiva notifiche", notifLesson:"Promemoria lezioni", notifStreak:"Promemoria serie", notifLb:"Aggiornamenti classifica", notifTime:"Ora promemoria", notifPerm:"Consenti notifiche", version:"versione" },
    home:{ xpLabel:"XP", streakLabel:"Giorni", lvlLabel:"Lv.", chooseRoad:"Scegli il tuo percorso", resume:"CONTINUA", daily:"SFIDA DEL GIORNO", dailyQ:"Domanda del giorno", dailyDone:"Sfida del giorno completata!", dailyCorrect:"+20 XP guadagnati 🎉", dailyWrong:"+5 XP · Torna domani", ok:"✅ Corretto! +20 XP", nok:"❌ Non proprio… +5 XP", activity:"ATTIVITÀ", streakCurrent:"Serie attuale", streakBest:"Migliore serie", activeDays:"Giorni attivi", ago60:"60 giorni fa", today:"Oggi" },
    profile:{ title:"Profilo", resetData:"Reimposta", save:"Salva", cancel:"Annulla" },
    result:{ xpGained:"punti guadagnati", correct:"Corrette", accuracy:"Precisione", lives:"Vite", continueBtn:"Continua", homeBtn:"Home", perfect:"Perfetto!", levelDone:"Livello completato!", tryAgain:"Riprova!", courage:"Coraggio!", keep:"Continua così!", allCorrect:"100% corretto!", badgesAvail:"Medaglie disponibili" },
    lesson:{ theory:"Teoria", quiz:"Quiz", code:"Codice", challenge:"Sfida", loading:"Caricamento lezione…", loadingWait:"Potrebbe richiedere alcuni secondi", errorTitle:"Errore di caricamento", retry:"Riprova", back:"Indietro", lessonOf:"Lezione", questionOf:"Domanda", understood:"Capito →", goodAnswer:"✅ Corretto!", wrongAnswer:"❌ Non proprio…", seeResult:"Vedi risultato →", finish:"Termina →", continueBtn:"Continua →" },
    tts:{ listen:"Ascolta", stop:"Ferma", tip:"Promemoria del corso" },
    lb:{ title:"Classifica", you:"• Tu" },
    badges:{ title:"Le mie medaglie", unlocked:"sbloccata", unlockedP:"sbloccate", unlockedLabel:"Sbloccata" },
    levels:{ theory:"Teoria + Quiz", code:"Codice", quiz:"Quiz", replay:"· Ripeti", levels:"livelli" },
    setup:{ label:"Come ti chiami?", optional:"(facoltativo)", placeholder:"Es: Alex", startBtn:"Inizia gratuitamente →", noKey:"Lezioni generate localmente · Nessuna chiave API", skip:"Salta →" },
    profile2:{ lvl:"Livello", roadmaps:"Percorsi", levels:"Livelli", theme:"Tema", dark:"scuro", light:"chiaro", apiKey:"Chiave API Anthropic", modify:"Modifica", cancel:"Annulla", save:"Salva", notConfigured:"Non configurata", progression:"PROGRESSI", params:"IMPOSTAZIONI", roadmapsAvail:"PERCORSI DISPONIBILI" },
  },
  nl: {
    nav: { home:"Startpagina", lb:"Ranglijst", badges:"Badges", profile:"Profiel", settings:"Instellingen" },
    settings: { title:"Instellingen", lang:"Taal", appearance:"Weergave", darkMode:"Donkere modus", notifications:"Meldingen", notifGlobal:"Meldingen inschakelen", notifLesson:"Lesherinneringen", notifStreak:"Reeksherinneringen", notifLb:"Ranglijstupdates", notifTime:"Herinneringstijd", notifPerm:"Meldingen toestaan", version:"versie" },
    home:{ xpLabel:"XP", streakLabel:"Dagen", lvlLabel:"Lv.", chooseRoad:"Kies je pad", resume:"DOORGAAN", daily:"DAGELIJKSE UITDAGING", dailyQ:"Vraag van de dag", dailyDone:"Dagelijkse uitdaging voltooid!", dailyCorrect:"+20 XP verdiend 🎉", dailyWrong:"+5 XP · Kom morgen terug", ok:"✅ Correct! +20 XP", nok:"❌ Niet helemaal… +5 XP", activity:"ACTIVITEIT", streakCurrent:"Huidige reeks", streakBest:"Beste reeks", activeDays:"Actieve dagen", ago60:"60 dagen geleden", today:"Vandaag" },
    profile:{ title:"Profiel", resetData:"Resetten", save:"Opslaan", cancel:"Annuleren" },
    result:{ xpGained:"punten verdiend", correct:"Correct", accuracy:"Nauwkeurigheid", lives:"Levens", continueBtn:"Doorgaan", homeBtn:"Startpagina", perfect:"Perfect!", levelDone:"Level voltooid!", tryAgain:"Probeer opnieuw!", courage:"Doorzetten!", keep:"Ga zo door!", allCorrect:"100% correct!", badgesAvail:"Badges beschikbaar" },
    lesson:{ theory:"Theorie", quiz:"Quiz", code:"Code", challenge:"Uitdaging", loading:"Les wordt geladen…", loadingWait:"Dit kan enkele seconden duren", errorTitle:"Ladfout", retry:"Opnieuw proberen", back:"Terug", lessonOf:"Les", questionOf:"Vraag", understood:"Begrepen →", goodAnswer:"✅ Correct!", wrongAnswer:"❌ Niet helemaal…", seeResult:"Resultaat bekijken →", finish:"Afronden →", continueBtn:"Doorgaan →" },
    tts:{ listen:"Luisteren", stop:"Stoppen", tip:"Cursusherinnering" },
    lb:{ title:"Ranglijst", you:"• Jij" },
    badges:{ title:"Mijn badges", unlocked:"ontgrendeld", unlockedP:"ontgrendeld", unlockedLabel:"Ontgrendeld" },
    levels:{ theory:"Theorie + Quiz", code:"Code", quiz:"Quiz", replay:"· Herhalen", levels:"levels" },
    setup:{ label:"Hoe heet je?", optional:"(optioneel)", placeholder:"Bijv. Alex", startBtn:"Gratis starten →", noKey:"Lessen lokaal gegenereerd · Geen API-sleutel nodig", skip:"Overslaan →" },
    profile2:{ lvl:"Level", roadmaps:"Leerpaden", levels:"Levels", theme:"Thema", dark:"donker", light:"licht", apiKey:"Anthropic API-sleutel", modify:"Bewerken", cancel:"Annuleren", save:"Opslaan", notConfigured:"Niet geconfigureerd", progression:"VOORTGANG", params:"INSTELLINGEN", roadmapsAvail:"BESCHIKBARE LEERPADEN" },
  },
  ja: {
    nav: { home:"ホーム", lb:"ランキング", badges:"バッジ", profile:"プロフィール", settings:"設定" },
    settings: { title:"設定", lang:"言語", appearance:"外観", darkMode:"ダークモード", notifications:"通知", notifGlobal:"通知を有効にする", notifLesson:"レッスンリマインダー", notifStreak:"ストリークリマインダー", notifLb:"ランキング更新", notifTime:"リマインダー時間", notifPerm:"通知を許可", version:"バージョン" },
    home:{ xpLabel:"XP", streakLabel:"日数", lvlLabel:"レベル", chooseRoad:"コースを選ぶ", resume:"再開", daily:"今日の課題", dailyQ:"今日の問題", dailyDone:"今日の課題完了！", dailyCorrect:"+20 XP 獲得 🎉", dailyWrong:"+5 XP · 明日また来てね", ok:"✅ 正解！ +20 XP", nok:"❌ 惜しい… +5 XP", activity:"アクティビティ", streakCurrent:"現在の連続", streakBest:"最高連続", activeDays:"アクティブ日数", ago60:"60日前", today:"今日" },
    profile:{ title:"プロフィール", resetData:"リセット", save:"保存", cancel:"キャンセル" },
    result:{ xpGained:"ポイント獲得", correct:"正解", accuracy:"正確さ", lives:"残機", continueBtn:"続ける", homeBtn:"ホーム", perfect:"完璧！", levelDone:"レベルクリア！", tryAgain:"もう一度！", courage:"頑張れ！", keep:"その調子！", allCorrect:"100%正解！", badgesAvail:"バッジが利用可能" },
    lesson:{ theory:"理論", quiz:"クイズ", code:"コード", challenge:"チャレンジ", loading:"レッスンを読み込み中…", loadingWait:"数秒かかる場合があります", errorTitle:"読み込みエラー", retry:"再試行", back:"戻る", lessonOf:"レッスン", questionOf:"問題", understood:"わかった →", goodAnswer:"✅ 正解！", wrongAnswer:"❌ 惜しい…", seeResult:"結果を見る →", finish:"終了 →", continueBtn:"続ける →" },
    tts:{ listen:"聴く", stop:"停止", tip:"コースのヒント" },
    lb:{ title:"ランキング", you:"• あなた" },
    badges:{ title:"マイバッジ", unlocked:"解除済み", unlockedP:"解除済み", unlockedLabel:"解除済み" },
    levels:{ theory:"理論 + クイズ", code:"コード", quiz:"クイズ", replay:"· 復習", levels:"レベル" },
    setup:{ label:"お名前は？", optional:"(任意)", placeholder:"例: Alex", startBtn:"無料で始める →", noKey:"ローカル生成 · APIキー不要", skip:"スキップ →" },
    profile2:{ lvl:"レベル", roadmaps:"ロードマップ", levels:"レベル", theme:"テーマ", dark:"ダーク", light:"ライト", apiKey:"Anthropic APIキー", modify:"編集", cancel:"キャンセル", save:"保存", notConfigured:"未設定", progression:"進捗", params:"設定", roadmapsAvail:"利用可能なロードマップ" },
  },
};

// ─── Générateur de cours intégré (aucune clé API requise) ────────────────────
const MOCK_DB = {
  // ── HTML ──────────────────────────────────────────────────────────────────
  html: {
    theory: "HTML (HyperText Markup Language) est le langage de balisage qui structure le contenu du web. Chaque élément est défini par des balises ouvrantes et fermantes. Un document commence par <!DOCTYPE html>, puis html > head > body. Les balises sémantiques HTML5 (header, nav, main, article, section, aside, footer) donnent du sens au contenu ; h1 à h6 définissent la hiérarchie des titres. Les listes s'écrivent avec ul (non ordonnée) ou ol (ordonnée), chaque item dans un li. Les liens utilisent la balise a avec href. Les images utilisent img avec src et alt. div (bloc) et span (inline) sont des conteneurs génériques. Les tableaux utilisent table avec tr, th et td. Les formulaires HTML incluent l'attribut required pour rendre un champ obligatoire. L'attribut title affiche une infobulle au survol.",
    questions: [
      { lessonId: 'html', levelTier: 1, topicTags: ['structure', 'headings'], q: "Quelle balise HTML représente le titre le plus important ?", answers: ["h6", "title", "h1", "header"], correct: 2, explanation: "h1 est le titre de niveau 1, le plus important hiérarchiquement. Les moteurs de recherche lui accordent un poids SEO significatif.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['links'], q: "Quelle balise est utilisée pour créer un lien hypertexte ?", answers: ["link", "a", "href", "url"], correct: 1, explanation: "La balise 'a' (anchor) crée des liens. L'attribut href définit la destination.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['media', 'images'], q: "Comment insérer une image en HTML ?", answers: ["image src=''", "img src=''", "img href=''", "picture src=''"], correct: 1, explanation: "img est une balise auto-fermante. src pointe vers le fichier et alt fournit une description textuelle accessible.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['forms'], q: "Quel attribut rend un champ de formulaire obligatoire ?", answers: ["mandatory", "required", "validate", "must"], correct: 1, explanation: "L'attribut 'required' empêche la soumission du formulaire si le champ est vide. C'est une validation HTML native.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['semantic', 'structure'], q: "Quel élément HTML5 est le plus approprié pour le contenu principal ?", answers: ["div.main", "section", "main", "content"], correct: 2, explanation: "main indique le contenu principal unique de la page et aide les technologies d'assistance.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['inline-block'], q: "Quelle est la différence entre div et span ?", answers: ["Aucune différence", "div est bloc, span est inline", "span est bloc, div est inline", "div est obsolète"], correct: 1, explanation: "div est un élément de type bloc qui prend toute la largeur. span est inline et ne crée pas de retour à la ligne.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['semantic', 'navigation'], q: "Quelle balise est sémantiquement correcte pour la navigation principale ?", answers: ["div#nav", "navigation", "nav", "menu"], correct: 2, explanation: "nav est la balise sémantique HTML5 dédiée à la navigation principale.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['lists'], q: "Comment créer une liste non ordonnée en HTML ?", answers: ["ol + li", "ul + li", "list + item", "nl + li"], correct: 1, explanation: "ul (unordered list) crée une liste à puces. Chaque élément est dans une balise li. ol crée une liste numérotée.", difficulty: 1 },
      { lessonId: 'html', levelTier: 1, topicTags: ['structure', 'body'], q: "Quelle balise définit le corps visible d'une page HTML ?", answers: ["head", "body", "main", "content"], correct: 1, explanation: "body contient tout le contenu visible de la page." },
      { lessonId: 'html', levelTier: 1, topicTags: ['tables'], q: "Quelle balise crée un tableau HTML ?", answers: ["grid", "table", "array", "list"], correct: 1, explanation: "table crée un tableau avec tr (lignes), th (en-têtes) et td (cellules)." },
      { lessonId: 'html', levelTier: 1, topicTags: ['attributes', 'accessibility'], q: "Quel attribut spécifie une infobulle au survol ?", answers: ["tooltip", "alt", "title", "hint"], correct: 2, explanation: "L'attribut title affiche une info-bulle quand la souris survole l'élément." },
      { lessonId: 'html', levelTier: 2, topicTags: ['semantic', 'article'], q: "Quelle balise HTML5 représente un contenu autonome (article de blog) ?", answers: ["section", "article", "aside", "content"], correct: 1, explanation: "article représente un contenu indépendant et autonome, réutilisable hors contexte." },
      { lessonId: 'html', levelTier: 2, topicTags: ['links', 'target'], q: "Comment ouvrir un lien dans un nouvel onglet ?", answers: ["target='_tab'", "target='_new'", "target='_blank'", "open='new'"], correct: 2, explanation: "_blank ouvre le lien dans un nouvel onglet. Ajouter rel='noopener' pour la sécurité." },
      { lessonId: 'html', levelTier: 2, topicTags: ['forms', 'attributes'], q: "Quel attribut HTML rend un élément non modifiable ?", answers: ["locked", "fixed", "readonly", "disabled"], correct: 2, explanation: "readonly empêche la modification mais l'élément reste soumis avec le formulaire. disabled l'exclut de la soumission." },
      { lessonId: 'html', levelTier: 2, topicTags: ['css', 'integration'], q: "Quelle balise est correcte pour intégrer du CSS dans le HTML ?", answers: ["<css>", "<script>", "<style>", "<link rel='css'>"], correct: 2, explanation: "La balise style dans le head permet d'écrire du CSS directement dans le HTML." },
    ],
  },
  // ── HTML Forms ────────────────────────────────────────────────────────────
  "html-forms": {
    theory: "Les formulaires HTML permettent de collecter des données utilisateur. La balise form englobe les contrôles : action définit l'URL de traitement, method définit GET ou POST. Les types d'input incluent text, email, password, number, checkbox, radio, date. L'attribut required rend un champ obligatoire. label for='id' améliore l'accessibilité en associant un texte à un champ.",
    questions: [
      { q: "Quel attribut rend un champ de formulaire obligatoire ?", answers: ["mandatory", "required", "validate", "must"], correct: 1, explanation: "'required' empêche la soumission si le champ est vide. C'est une validation HTML native, sans JavaScript.", difficulty: 1 },
      { q: "Quel type d'input valide automatiquement le format email ?", answers: ["type='mail'", "type='email'", "type='contact'", "type='text'"], correct: 1, explanation: "type='email' effectue une validation native du format email. Le navigateur affiche une erreur si le format est invalide.", difficulty: 1 },
      { q: "Comment associer un label à son champ d'input ?", answers: ["Avec l'attribut name", "Avec for='id_du_champ'", "Avec class='label'", "Automatiquement par position"], correct: 1, explanation: "L'attribut for du label doit correspondre à l'id de l'input. Améliore l'accessibilité et le clic sur le label active le champ.", difficulty: 2 },
      { q: "Quelle méthode HTTP est recommandée pour envoyer des données sensibles ?", answers: ["GET", "HEAD", "POST", "SEND"], correct: 2, explanation: "POST envoie les données dans le corps de la requête, invisibles dans l'URL. GET affiche les données dans l'URL.", difficulty: 2 },
      { q: "Quelle balise regroupe des champs de formulaire liés thématiquement ?", answers: ["group", "fieldset", "section", "form-group"], correct: 1, explanation: "fieldset groupe des contrôles liés. legend lui donne un titre descriptif. Améliore l'accessibilité.", difficulty: 2 },
    ],
  },
  // ── CSS ───────────────────────────────────────────────────────────────────
  css: {
    theory: "CSS (Cascading Style Sheets) contrôle l'apparence visuelle des éléments HTML. Les règles CSS suivent la syntaxe : sélecteur { propriété: valeur; }. La cascade détermine quelle règle s'applique en cas de conflit, selon la spécificité du sélecteur et l'ordre d'apparition. Les sélecteurs vont du plus général (balise) au plus spécifique (id), avec les classes entre les deux. Comprendre la spécificité évite la plupart des bugs CSS courants.",
    questions: [
      { lessonId: 'css', levelTier: 1, topicTags: ['colors'], q: "Quelle propriété CSS change la couleur du texte ?", answers: ["font-color", "text-color", "color", "foreground"], correct: 2, explanation: "La propriété 'color' définit la couleur du texte. Elle accepte des valeurs en nom, hexadécimal, RGB ou HSL." },
      { lessonId: 'css', levelTier: 1, topicTags: ['specificity', 'selectors'], q: "Quel sélecteur CSS a la plus haute spécificité ?", answers: [".classe", "balise", "#id", "* (universel)"], correct: 2, explanation: "Les sélecteurs d'id (#id) ont une spécificité plus haute que les classes et les balises." },
      { lessonId: 'css', levelTier: 1, topicTags: ['box-model', 'spacing'], q: "Quelle propriété CSS crée un espacement interne à l'élément ?", answers: ["margin", "padding", "border", "spacing"], correct: 1, explanation: "Le padding est l'espace entre le contenu et la bordure. Le margin est l'espace extérieur entre l'élément et ses voisins." },
      { lessonId: 'css', levelTier: 1, topicTags: ['box-model'], q: "Que fait box-sizing: border-box ?", answers: ["Ajoute une bordure automatique", "Inclut padding et border dans la largeur totale", "Supprime le modèle de boîte", "Centre l'élément"], correct: 1, explanation: "Avec border-box, width: 200px inclut déjà le padding et la bordure. Sans lui, ils s'ajoutent à la largeur déclarée." },
      { lessonId: 'css', levelTier: 1, topicTags: ['units'], q: "Quelle unité CSS est relative à la taille de police de l'élément parent ?", answers: ["px", "em", "rem", "vh"], correct: 1, explanation: "em est relatif à la font-size du parent direct. rem est relatif à l'élément racine, plus prévisible." },
      { lessonId: 'css', levelTier: 1, topicTags: ['pseudo-classes', 'selectors'], q: "Comment appliquer un style uniquement au premier enfant ?", answers: [".first-child", ":first-child", "::first-child", "#first"], correct: 1, explanation: ":first-child est une pseudo-classe qui cible le premier enfant. :nth-child(1) est équivalent." },
      { lessonId: 'css', levelTier: 1, topicTags: ['positioning'], q: "Quelle valeur de position sort l'élément du flux normal ?", answers: ["relative", "static", "absolute", "inherit"], correct: 2, explanation: "absolute et fixed sortent l'élément du flux. absolute se positionne par rapport au parent positionné le plus proche." },
      { lessonId: 'css', levelTier: 1, topicTags: ['layout', 'centering'], q: "Comment centrer horizontalement un bloc avec CSS moderne ?", answers: ["text-align: center", "margin: auto", "display: flex + justify-content: center", "position: center"], correct: 2, explanation: "Sur un conteneur flex, justify-content: center aligne les enfants au centre de l'axe principal. C'est la méthode la plus robuste aujourd'hui." },
      { lessonId: 'css', levelTier: 1, topicTags: ['typography', 'font'], q: "Comment rendre du texte en gras en CSS ?", answers: ["text-weight: bold", "font-style: bold", "font-weight: bold", "text-bold: true"], correct: 2, explanation: "font-weight: bold rend le texte en gras. Les valeurs numériques vont de 100 (fin) à 900 (très gras)." },
      { lessonId: 'css', levelTier: 1, topicTags: ['border-radius', 'design'], q: "Quelle propriété arrondit les coins d'un élément ?", answers: ["corner-radius", "border-curve", "border-radius", "round-corners"], correct: 2, explanation: "border-radius arrondit les coins. border-radius: 50% crée un cercle parfait sur un élément carré." },
      { lessonId: 'css', levelTier: 2, topicTags: ['transitions', 'animations'], q: "Quelle propriété CSS crée une transition fluide ?", answers: ["animation", "transform", "transition", "ease"], correct: 2, explanation: "transition: property duration timing-function. Ex : transition: all 0.3s ease crée une animation fluide sur toutes les propriétés modifiées." },
      { lessonId: 'css', levelTier: 2, topicTags: ['opacity', 'visibility'], q: "Que fait 'opacity: 0' ?", answers: ["Supprime l'élément du DOM", "Rend l'élément invisible mais il prend toujours de la place", "Réduit la taille à 0", "Cache l'élément comme display:none"], correct: 1, explanation: "opacity: 0 rend invisible mais l'élément reste dans le flux et prend de la place. display: none le retire complètement." },
      { lessonId: 'css', levelTier: 2, topicTags: ['box-shadow', 'design'], q: "Quelle propriété CSS crée une ombre sur un élément ?", answers: ["element-shadow", "drop-shadow", "box-shadow", "shadow"], correct: 2, explanation: "box-shadow: x y blur spread color. Ex : box-shadow: 0 4px 6px rgba(0,0,0,0.1) crée une ombre subtile." },
      { lessonId: 'css', levelTier: 2, topicTags: ['overflow'], q: "Que fait 'overflow: hidden' ?", answers: ["Cache les scrollbars", "Cache le contenu qui dépasse les limites de l'élément", "Empêche le scroll", "Supprime les marges"], correct: 1, explanation: "overflow: hidden coupe le contenu qui sort de la boîte. Utile pour les images dans des conteneurs arrondis ou pour clearfix." },
      { lessonId: 'css', levelTier: 3, topicTags: ['keyframes', 'animations'], q: "Quelle propriété CSS permet des animations complexes frame par frame ?", answers: ["transition", "transform", "@keyframes + animation", "motion"], correct: 2, explanation: "@keyframes définit les étapes de l'animation. La propriété animation applique cette animation : animation: nom durée timing." },
    ],
  },
  // ── CSS Responsive ────────────────────────────────────────────────────────
  "css-responsive": {
    theory: "Les media queries CSS adaptent le style selon les caractéristiques de l'écran. Syntaxe : @media (condition) { règles }. L'approche mobile-first commence par les styles mobiles, puis ajoute des media queries @media (min-width: N) pour les grands écrans. Breakpoints courants : 640px, 768px, 1024px, 1280px. Les unités relatives facilitent l'adaptation : vw (largeur viewport), vh (hauteur viewport), % (relatif au parent).",
    questions: [
      { q: "Quelle syntaxe CSS s'applique seulement si l'écran est plus large que 768px ?", answers: ["@screen (max-width: 768px)", "@media (min-width: 768px)", "@responsive 768px", "@breakpoint md"], correct: 1, explanation: "@media (min-width: 768px) s'active sur les écrans d'au moins 768px. C'est l'approche mobile-first.", difficulty: 1 },
      { q: "Quelle approche commence par les styles mobiles puis s'adapte aux grands écrans ?", answers: ["desktop-first", "responsive-first", "mobile-first", "adaptive-design"], correct: 2, explanation: "Mobile-first : styles de base pour mobile, puis min-width pour ajouter des styles aux grands écrans.", difficulty: 2 },
      { q: "Quelle unité CSS représente 1% de la largeur de la fenêtre du navigateur ?", answers: ["ww", "vw", "%", "sw"], correct: 1, explanation: "1vw = 1% de la largeur du viewport. 100vw = pleine largeur.", difficulty: 1 },
      { q: "Quel meta tag est indispensable pour que les media queries fonctionnent sur mobile ?", answers: ["meta name='mobile'", "meta name='viewport' content='width=device-width, initial-scale=1'", "meta name='responsive'", "meta http-equiv='mobile'"], correct: 1, explanation: "Sans ce viewport meta tag, le mobile simule un écran large et les media queries ne fonctionnent pas correctement.", difficulty: 2 },
    ],
  },
  // ── Flexbox ───────────────────────────────────────────────────────────────
  flexbox: {
    theory: "Flexbox est un système de mise en page CSS pensé pour aligner des éléments en ligne ou en colonne. Pour l'activer, on écrit display: flex sur un conteneur — ses enfants directs deviennent alors des 'flex items'. L'axe principal est horizontal par défaut (flex-direction: row). justify-content gère l'alignement sur cet axe, align-items sur l'axe perpendiculaire. C'est la solution idéale pour les barres de navigation, les cartes, les formulaires.",
    questions: [
      { q: "Quelle propriété active Flexbox sur un conteneur ?", answers: ["flex: 1", "display: flex", "flex-container: true", "layout: flex"], correct: 1, explanation: "display: flex transforme le conteneur en 'flex container'. Ses enfants directs deviennent automatiquement des 'flex items' et peuvent être alignés facilement." },
      { q: "Que fait justify-content: center ?", answers: ["Centre le texte", "Centre les flex items sur l'axe principal", "Centre les items sur l'axe perpendiculaire", "Centre le conteneur dans la page"], correct: 1, explanation: "justify-content gère l'alignement sur l'axe principal (horizontal par défaut). center regroupe tous les items au centre. Autres valeurs utiles : space-between, space-around, flex-start, flex-end." },
      { q: "Que fait align-items: center ?", answers: ["Centre le texte dans les items", "Centre les items sur l'axe principal", "Centre les items sur l'axe perpendiculaire", "Centre le conteneur"], correct: 2, explanation: "align-items aligne les flex items sur l'axe perpendiculaire à l'axe principal. Avec flex-direction: row, c'est l'alignement vertical. center les place au milieu verticalement." },
      { q: "Quelle propriété change la direction des flex items ?", answers: ["flex-align", "axis-direction", "flex-direction", "flex-flow-direction"], correct: 2, explanation: "flex-direction définit l'axe principal : row (horizontal, par défaut), column (vertical), row-reverse (horizontal inversé), column-reverse (vertical inversé)." },
      { q: "Que fait flex: 1 sur un flex item ?", answers: ["Donne 1px de largeur", "Permet à l'item de grandir pour remplir l'espace libre", "Place l'item en premier", "Duplique l'item"], correct: 1, explanation: "flex: 1 est un raccourci pour flex-grow: 1, flex-shrink: 1, flex-basis: 0. L'item s'étend pour occuper tout l'espace disponible. Si deux items ont flex: 1, ils se partagent l'espace à égalité." },
      { q: "Que fait justify-content: space-between ?", answers: ["Ajoute de l'espace à l'intérieur des items", "Place le premier item au début, le dernier à la fin, espace égal entre les autres", "Centre tous les items avec espace autour", "Aligne les items verticalement"], correct: 1, explanation: "space-between colle le premier item au début et le dernier à la fin. L'espace restant est distribué équitablement entre les items intermédiaires." },
      { q: "Comment empêcher les flex items de passer à la ligne ?", answers: ["flex-wrap: no-wrap", "flex-wrap: nowrap", "flex-overflow: hidden", "wrap: false"], correct: 1, explanation: "flex-wrap: nowrap est la valeur par défaut — les items restent sur une seule ligne et se compriment si nécessaire. flex-wrap: wrap les autorise à passer à la ligne suivante." },
      { q: "Que fait align-self sur un flex item ?", answers: ["Aligne le texte à l'intérieur de l'item", "Surcharge align-items pour cet item spécifiquement", "Définit la taille de l'item", "Aligne tous les items"], correct: 1, explanation: "align-self permet à un item individuel d'ignorer la règle align-items du conteneur et de s'aligner différemment des autres items." },
      { q: "Quel est l'axe principal par défaut avec Flexbox ?", answers: ["Vertical (colonne)", "Diagonal", "Horizontal (ligne)", "Circulaire"], correct: 2, explanation: "Par défaut, flex-direction est 'row', donc l'axe principal est horizontal. justify-content contrôle l'alignement horizontal, align-items le vertical." },
      { q: "Que fait flex-grow: 0 ?", answers: ["L'item ne grandit pas pour remplir l'espace libre", "L'item disparaît", "L'item prend toute la place", "L'item ne se rétrécit pas"], correct: 0, explanation: "flex-grow: 0 (valeur par défaut) signifie que l'item ne grandit pas pour occuper l'espace disponible. Il garde sa taille naturelle. flex-grow: 1 lui permettrait de grandir." },
      { q: "Quel raccourci place un élément au centre absolu (vertical + horizontal) ?", answers: ["display: flex; center: all", "display: flex; place-items: center", "display: flex; justify: center; align: center", "display: flex; justify-content: center; align-items: center"], correct: 3, explanation: "La combinaison justify-content: center + align-items: center centre les items sur les deux axes. C'est la technique la plus simple pour centrer un élément au milieu de son conteneur." },
      { q: "Que fait flex-direction: column ?", answers: ["Affiche les items de droite à gauche", "Affiche les items de bas en haut", "Affiche les items de haut en bas (en colonne)", "Affiche les items en diagonale"], correct: 2, explanation: "column change l'axe principal en vertical. Les items s'empilent de haut en bas. justify-content contrôle alors l'alignement vertical, align-items l'horizontal." },
      { q: "Que fait flex-wrap: wrap ?", answers: ["Entoure le conteneur d'une bordure", "Autorise les items à passer sur plusieurs lignes", "Supprime les espaces entre les items", "Inverse l'ordre des items"], correct: 1, explanation: "flex-wrap: wrap permet aux flex items de passer à la ligne suivante quand il n'y a plus de place. Sans ça (nowrap), ils se compriment tous sur une seule ligne." },
      { q: "Quelle propriété permet de changer l'ordre visuel d'un flex item ?", answers: ["position", "z-index", "order", "flex-order"], correct: 2, explanation: "La propriété 'order' change l'ordre d'affichage d'un item sans modifier le HTML. Par défaut, tous les items ont order: 0. Un item avec order: 1 apparaîtra après ceux avec order: 0." },
    ],
  },
  grid: {
    theory: "CSS Grid est un système de mise en page en deux dimensions — il gère à la fois les lignes et les colonnes en même temps. On l'active avec display: grid sur le conteneur. grid-template-columns définit la largeur des colonnes, grid-template-rows celle des lignes. L'unité 'fr' (fraction) distribue l'espace restant proportionnellement. Grid est parfait pour les grandes structures de page, là où Flexbox gère les composants plus petits.",
    questions: [
      { q: "Quelle propriété active CSS Grid sur un conteneur ?", answers: ["layout: grid", "grid: true", "display: grid", "flex-grid: on"], correct: 2, explanation: "display: grid transforme l'élément en conteneur de grille. Ses enfants directs deviennent des 'grid items' placés automatiquement dans les cellules de la grille." },
      { q: "Que signifie 'fr' dans grid-template-columns: 1fr 2fr ?", answers: ["Frame (image)", "Fraction de l'espace disponible", "Fixed row (ligne fixe)", "Frequency (fréquence)"], correct: 1, explanation: "fr est l'unité fractionnaire de CSS Grid. 1fr 2fr crée 2 colonnes : la seconde est deux fois plus large que la première. C'est beaucoup plus flexible que les pourcentages." },
      { q: "Que fait grid-template-columns: repeat(3, 1fr) ?", answers: ["Répète 3 fois la grille", "Crée 3 colonnes de largeur égale", "Crée 3 lignes de même hauteur", "Duplique 3 éléments"], correct: 1, explanation: "repeat(3, 1fr) crée 3 colonnes qui se partagent équitablement l'espace disponible. C'est équivalent à écrire '1fr 1fr 1fr' mais en plus lisible." },
      { q: "Comment faire en sorte qu'un élément occupe 2 colonnes ?", answers: ["width: 2 columns", "colspan: 2", "grid-column: span 2", "column-span: 2"], correct: 2, explanation: "grid-column: span 2 étire l'élément sur 2 colonnes. On peut aussi écrire grid-column: 1 / 3 pour positionner de la ligne de grille 1 à la ligne 3 (soit 2 colonnes)." },
      { q: "Quelle propriété définit l'espacement entre les cellules d'une grille ?", answers: ["spacing", "cell-gap", "grid-gap / gap", "margin"], correct: 2, explanation: "La propriété 'gap' (anciennement grid-gap) définit l'espace entre les cellules. On peut écrire gap: 20px pour un espace uniforme, ou gap: 10px 20px pour (lignes, colonnes) séparément." },
      { q: "Que fait grid-template-areas ?", answers: ["Nomme les zones de la grille pour les positionner", "Crée des zones cliquables", "Définit les couleurs de chaque zone", "Cache certaines zones"], correct: 0, explanation: "grid-template-areas permet de nommer des zones et de les positionner visuellement dans le code CSS. C'est très lisible : on dessine la grille avec des noms de zones." },
      { q: "Quelle est la différence entre Flexbox et Grid ?", answers: ["Il n'y a pas de différence", "Flexbox est 1D (ligne ou colonne), Grid est 2D (lignes ET colonnes)", "Grid est plus ancien que Flexbox", "Flexbox gère le texte, Grid gère les images"], correct: 1, explanation: "Flexbox est unidimensionnel : il gère soit une ligne, soit une colonne à la fois. CSS Grid est bidimensionnel : il gère simultanément lignes et colonnes, idéal pour les mises en page complexes." },
      { q: "Que fait grid-column: 1 / -1 ?", answers: ["Positionne l'élément à gauche", "Étire l'élément sur toutes les colonnes de la grille", "Supprime la première colonne", "Inverse les colonnes"], correct: 1, explanation: "En CSS Grid, -1 désigne la dernière ligne de grille. grid-column: 1 / -1 étire donc l'élément du début à la fin, occupant toutes les colonnes." },
      { q: "Que fait 'grid-auto-rows: minmax(100px, auto)' ?", answers: ["Crée des lignes de 100px fixes", "Les lignes font minimum 100px et grandissent si le contenu est plus grand", "Limite la grille à 100px de hauteur", "Crée automatiquement des colonnes de 100px"], correct: 1, explanation: "minmax() définit une taille minimum et maximum. minmax(100px, auto) garantit que chaque ligne fait au moins 100px, mais peut grandir pour s'adapter à un contenu plus grand." },
      { q: "Quelle propriété place un élément dans une zone nommée de la grille ?", answers: ["grid-place: nom", "grid-area: nom", "grid-zone: nom", "area: nom"], correct: 1, explanation: "grid-area: nom-de-zone positionne un élément dans la zone correspondante définie par grid-template-areas. C'est très puissant pour créer des mises en page lisibles." },
      { q: "Que fait justify-items: center dans une grille ?", answers: ["Centre les colonnes de la grille", "Centre le contenu des cellules horizontalement", "Centre la grille dans son conteneur", "Centre le texte dans les cellules"], correct: 1, explanation: "justify-items aligne le contenu de chaque cellule sur l'axe horizontal (en ligne). center place le contenu au milieu de chaque cellule. place-items: center combine justify-items et align-items." },
      { q: "Comment créer un layout responsive avec Grid sans media queries ?", answers: ["grid-template-columns: auto auto auto", "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))", "grid-responsive: true", "grid-template-columns: 1fr 1fr 1fr"], correct: 1, explanation: "auto-fit avec minmax() crée autant de colonnes que la largeur le permet, chacune faisant au moins 200px. Sur mobile, ça donne 1 colonne. Sur desktop, 3 ou 4 colonnes. Zéro media query !" },
      { q: "Quelle est la valeur par défaut de grid-template-columns ?", answers: ["1fr", "auto", "none", "100%"], correct: 2, explanation: "Par défaut, grid-template-columns est 'none'. La grille crée alors une seule colonne qui prend toute la largeur disponible. Les éléments s'empilent verticalement comme en display: block." },
    ],
  },
  javascript: {
    theory: "JavaScript est le langage de programmation du web. Il permet de rendre les pages interactives. Une variable stocke une valeur — on la déclare avec let (modifiable) ou const (constante). JavaScript connaît plusieurs types de données : les textes (strings), les nombres (numbers), les booléens (true/false), les tableaux (arrays) et les objets. Une fonction regroupe des instructions qu'on peut réutiliser : function direBonjour() { console.log('Bonjour !'); }.",
    questions: [
      { q: "Comment déclarer une variable qui ne changera pas en JavaScript ?", answers: ["var", "let", "const", "static"], correct: 2, explanation: "const déclare une constante : sa valeur ne peut pas être réassignée. let déclare une variable modifiable. Il est recommandé d'utiliser const par défaut et let uniquement si la valeur doit changer." },
      { q: "Quel type retourne typeof 'bonjour' ?", answers: ["'text'", "'string'", "'word'", "'char'"], correct: 1, explanation: "typeof retourne le type d'une valeur. typeof 'bonjour' retourne 'string'. typeof 42 retourne 'number'. typeof true retourne 'boolean'. typeof [] retourne étrangement 'object'." },
      { q: "Comment afficher du texte dans la console du navigateur ?", answers: ["print('texte')", "console.log('texte')", "log('texte')", "display('texte')"], correct: 1, explanation: "console.log() affiche un message dans la console des outils développeur. C'est l'outil de débogage de base en JavaScript. console.error() affiche en rouge, console.warn() en orange." },
      { q: "Quelle est la valeur de 5 + '3' en JavaScript ?", answers: ["8", "'53'", "Erreur", "NaN"], correct: 1, explanation: "Quand on additionne un nombre et une chaîne de caractères, JavaScript convertit le nombre en texte et les concatène. 5 + '3' donne la chaîne '53', pas le nombre 8." },
      { q: "Comment créer un tableau (array) en JavaScript ?", answers: ["let arr = (1, 2, 3)", "let arr = {1, 2, 3}", "let arr = [1, 2, 3]", "let arr = <1, 2, 3>"], correct: 2, explanation: "Un tableau se crée avec des crochets []. let fruits = ['pomme', 'banane', 'orange']. On accède aux éléments par leur index (qui commence à 0) : fruits[0] retourne 'pomme'." },
      { q: "Comment écrire une condition 'si...sinon' en JavaScript ?", answers: ["when...otherwise", "if...else", "check...default", "test...fallback"], correct: 1, explanation: "if...else est la structure conditionnelle de base. if (condition) { ... } else { ... }. On peut aussi enchaîner avec else if pour tester plusieurs conditions." },
      { q: "Quelle méthode ajoute un élément à la fin d'un tableau ?", answers: ["array.add()", "array.append()", "array.push()", "array.insert()"], correct: 2, explanation: "push() ajoute un ou plusieurs éléments à la fin du tableau et retourne la nouvelle longueur. pop() retire et retourne le dernier élément. unshift() ajoute au début, shift() retire au début." },
      { q: "Comment écrire une boucle qui répète 5 fois en JavaScript ?", answers: ["repeat(5) { }", "loop 5 times { }", "for (let i = 0; i < 5; i++) { }", "while i < 5 { }"], correct: 2, explanation: "La boucle for classique a trois parties : initialisation (let i = 0), condition (i < 5) et incrémentation (i++). Elle répète le bloc tant que la condition est vraie." },
      { q: "Que retourne 'bonjour'.length ?", answers: ["7", "'bonjour'", "8", "undefined"], correct: 0, explanation: "La propriété .length donne le nombre de caractères d'une chaîne. 'bonjour' a 7 caractères, donc .length retourne 7. Pour un tableau, .length donne le nombre d'éléments." },
      { q: "Comment vérifier si deux valeurs sont strictement égales ?", answers: ["=", "==", "===", "equals()"], correct: 2, explanation: "=== (triple égal) vérifie à la fois la valeur ET le type. 5 === '5' est false car un est un nombre et l'autre une chaîne. == (double égal) convertit les types avant de comparer, ce qui peut créer des bugs." },
      { q: "Qu'est-ce qu'une fonction fléchée (arrow function) ?", answers: ["Une fonction avec une flèche dans son nom", "Une syntaxe courte pour écrire des fonctions : () => {}", "Une fonction qui pointe vers un élément DOM", "Une fonction anonyme classique"], correct: 1, explanation: "Les fonctions fléchées (ES6) sont une syntaxe plus courte : const double = (n) => n * 2; au lieu de function double(n) { return n * 2; }. Elles n'ont pas leur propre 'this'." },
      { q: "Que fait la méthode .map() sur un tableau ?", answers: ["Dessine une carte géographique", "Retourne un nouveau tableau transformé élément par élément", "Cherche un élément dans le tableau", "Trie les éléments"], correct: 1, explanation: ".map() crée un nouveau tableau en appliquant une fonction à chaque élément. [1,2,3].map(n => n*2) retourne [2,4,6]. Le tableau original n'est pas modifié." },
      { q: "Qu'est-ce qu'un objet en JavaScript ?", answers: ["Un fichier spécial", "Une collection de paires clé-valeur entre accolades {}", "Un type de tableau", "Une variable numérique"], correct: 1, explanation: "Un objet regroupe des données sous forme de propriétés : const user = { nom: 'Alice', age: 25 }. On accède aux propriétés avec user.nom ou user['nom']." },
      { q: "Comment convertir une chaîne '42' en nombre ?", answers: ["string.toNumber('42')", "Number('42') ou parseInt('42')", "'42'.convert()", "int('42')"], correct: 1, explanation: "Number('42') retourne le nombre 42. parseInt('42') aussi (mais ignore les décimales). parseFloat('3.14') gère les décimales. +'42' est un raccourci avec l'opérateur +." },
      { q: "Que fait console.log(typeof null) ?", answers: ["'null'", "'undefined'", "'object'", "'nothing'"], correct: 2, explanation: "C'est un bug historique de JavaScript : typeof null retourne 'object' alors qu'on attendrait 'null'. Ce comportement existe depuis la première version de JS et ne peut pas être corrigé sans casser du code existant." },
    ],
  },
  dom: {
    theory: "Le DOM (Document Object Model) est la représentation en arbre de la page HTML que JavaScript peut lire et modifier. Chaque balise HTML devient un 'nœud' dans cet arbre. document.querySelector('#mon-id') sélectionne un élément par son sélecteur CSS. addEventListener() permet de réagir aux actions de l'utilisateur (clic, frappe, survol). innerHTML modifie le contenu HTML d'un élément, textContent modifie uniquement son texte.",
    questions: [
      { q: "Comment sélectionner un élément par son id en JavaScript ?", answers: ["document.getById('id')", "document.querySelector('#id')", "document.find('#id')", "document.select('id')"], correct: 1, explanation: "document.querySelector('#id') sélectionne le premier élément correspondant au sélecteur CSS. document.getElementById('id') est l'ancienne méthode équivalente. querySelector est plus flexible car il accepte n'importe quel sélecteur CSS." },
      { q: "Comment ajouter un écouteur d'événement sur un bouton ?", answers: ["bouton.on('click', fn)", "bouton.onClick = fn", "bouton.addEventListener('click', fn)", "bouton.listen('click', fn)"], correct: 2, explanation: "addEventListener(type, fonction) écoute un événement sur un élément. Le premier paramètre est le type d'événement ('click', 'input', 'keydown'...), le deuxième est la fonction à exécuter." },
      { q: "Que fait innerHTML ?", answers: ["Retourne le HTML complet de la page", "Permet de lire ou modifier le contenu HTML d'un élément", "Insère un élément avant un autre", "Affiche le code source"], correct: 1, explanation: "innerHTML lit ou écrit le contenu HTML d'un élément. element.innerHTML = '<b>Bonjour</b>' remplace tout le contenu par du texte en gras. textContent fait pareil mais sans interpréter le HTML." },
      { q: "Comment créer un nouvel élément HTML avec JavaScript ?", answers: ["document.make('div')", "new Element('div')", "document.createElement('div')", "HTML.create('div')"], correct: 2, explanation: "document.createElement('div') crée un nouvel élément div en mémoire. Il n'apparaît pas encore dans la page — il faut l'ajouter avec appendChild() ou append()." },
      { q: "Comment ajouter un élément créé à la fin d'un autre ?", answers: ["parent.add(enfant)", "parent.appendChild(enfant)", "parent.insert(enfant)", "parent.append(enfant) ou parent.appendChild(enfant)"], correct: 3, explanation: "appendChild() et append() ajoutent un enfant à la fin d'un élément parent. append() est plus moderne et accepte aussi du texte directement. appendChild() ne fonctionne qu'avec des nœuds DOM." },
      { q: "Que fait classList.add('active') ?", answers: ["Crée une nouvelle classe CSS", "Ajoute la classe 'active' à l'élément", "Supprime la classe 'active'", "Vérifie si la classe existe"], correct: 1, explanation: "classList.add() ajoute une ou plusieurs classes CSS à un élément. classList.remove() en supprime. classList.toggle() alterne — ajoute si absente, supprime si présente. classList.contains() vérifie." },
      { q: "Comment empêcher le comportement par défaut d'un formulaire ?", answers: ["event.stop()", "event.preventDefault()", "event.cancel()", "return null"], correct: 1, explanation: "event.preventDefault() empêche le comportement par défaut (comme la soumission d'un formulaire qui rechargerait la page). On l'appelle dans la fonction d'écoute d'événement avec le paramètre event." },
      { q: "Que retourne document.querySelectorAll('.item') ?", answers: ["Le premier élément avec la classe 'item'", "Un tableau de tous les éléments", "Une NodeList de tous les éléments correspondants", "Une chaîne de texte"], correct: 2, explanation: "querySelectorAll() retourne une NodeList (similaire à un tableau) de TOUS les éléments correspondant au sélecteur. querySelector() (sans All) retourne seulement le premier." },
      { q: "Comment changer le texte d'un élément sans interpréter le HTML ?", answers: ["element.innerHTML = 'texte'", "element.text = 'texte'", "element.textContent = 'texte'", "element.write('texte')"], correct: 2, explanation: "textContent lit ou modifie le texte d'un élément sans interpréter les balises HTML. C'est plus sécurisé qu'innerHTML car ça évite les attaques XSS (injection de code malveillant)." },
      { q: "Quel événement se déclenche quand un champ de texte est modifié ?", answers: ["'change' ou 'input'", "'keypress'", "'focus'", "'type'"], correct: 0, explanation: "'input' se déclenche à chaque frappe, en temps réel. 'change' se déclenche quand l'utilisateur quitte le champ après modification. Pour réagir instantanément, utilisez 'input'." },
      { q: "Comment accéder à la valeur d'un champ de formulaire ?", answers: ["input.text", "input.content", "input.value", "input.data"], correct: 2, explanation: "La propriété .value contient la valeur saisie dans un champ. Pour les cases à cocher, on utilise .checked (true/false). Pour les listes déroulantes, .value retourne l'option sélectionnée." },
      { q: "Que fait event.stopPropagation() ?", answers: ["Annule l'événement", "Empêche l'événement de remonter aux éléments parents", "Stoppe toutes les animations", "Désactive le bouton"], correct: 1, explanation: "En JavaScript, les événements 'remontent' dans le DOM (bubbling) : un clic sur un enfant déclenche aussi le clic sur les parents. stopPropagation() arrête cette remontée." },
      { q: "Comment modifier le style CSS d'un élément directement en JS ?", answers: ["element.css('color', 'red')", "element.setStyle('color: red')", "element.style.color = 'red'", "element.addClass('red')"], correct: 2, explanation: "element.style.propriete = 'valeur' modifie le style en ligne d'un élément. Les propriétés CSS avec tiret s'écrivent en camelCase : background-color devient backgroundColor." },
      { q: "Que retourne document.querySelector('.btn') si aucun élément n'existe ?", answers: ["Une NodeList vide", "undefined", "null", "false"], correct: 2, explanation: "querySelector() retourne null si aucun élément ne correspond. Il faut toujours vérifier avant d'utiliser : const btn = document.querySelector('.btn'); if (btn) btn.addEventListener(...)." },
    ],
  },
  async: {
    theory: "JavaScript est par nature asynchrone : certaines opérations (appels réseau, lecture de fichiers) prennent du temps sans bloquer le reste du code. Les Promises représentent une valeur future — elles peuvent être 'en attente', 'résolue' (succès) ou 'rejetée' (erreur). async/await est la syntaxe moderne qui rend le code asynchrone lisible comme du code synchrone : on écrit 'await' devant une Promise et le code attend son résultat.",
    questions: [
      { q: "Qu'est-ce qu'une Promise en JavaScript ?", answers: ["Une variable globale", "Un objet représentant une valeur disponible maintenant ou dans le futur", "Une boucle asynchrone", "Un type de fonction récursive"], correct: 1, explanation: "Une Promise représente une valeur qui sera disponible plus tard. Elle a 3 états : pending (en attente), fulfilled (résolue avec succès) ou rejected (rejetée avec une erreur)." },
      { q: "Comment lire le résultat d'une Promise résolue ?", answers: [".get()", ".result()", ".then(fn)", ".resolve(fn)"], correct: 2, explanation: ".then(fn) s'exécute quand la Promise est résolue avec succès. On enchaîne les .then() pour traiter les données étape par étape. .catch() gère les erreurs." },
      { q: "Que fait le mot-clé 'async' devant une fonction ?", answers: ["Rend la fonction plus rapide", "La fonction retourne automatiquement une Promise", "Permet d'utiliser des boucles", "Désactive la gestion d'erreurs"], correct: 1, explanation: "Une fonction déclarée async retourne toujours une Promise. Ça permet d'utiliser 'await' à l'intérieur pour attendre d'autres Promises de façon lisible." },
      { q: "Que fait 'await' dans une fonction async ?", answers: ["Arrête définitivement la fonction", "Met en pause la fonction jusqu'à ce que la Promise soit résolue", "Lance une animation d'attente", "Crée une nouvelle Promise"], correct: 1, explanation: "await suspend l'exécution de la fonction async jusqu'à ce que la Promise soit résolue ou rejetée. Pendant ce temps, le reste du programme continue de fonctionner (pas de blocage)." },
      { q: "Comment faire un appel API avec fetch ?", answers: ["http.get(url)", "ajax.call(url)", "fetch(url)", "request(url)"], correct: 2, explanation: "fetch(url) fait une requête HTTP et retourne une Promise. On l'utilise souvent avec await : const response = await fetch(url); puis const data = await response.json();" },
      { q: "Que fait response.json() après un fetch ?", answers: ["Affiche la réponse en JSON", "Convertit la réponse en objet JavaScript", "Vérifie si la réponse est valide", "Encode la réponse en JSON"], correct: 1, explanation: "response.json() lit le corps de la réponse et le convertit en objet JavaScript. C'est aussi une Promise, donc il faut await : const data = await response.json();" },
      { q: "Comment gérer les erreurs avec async/await ?", answers: ["if (error) {}", ".catch(err)", "try { await... } catch(err) {}", "async.error(fn)"], correct: 2, explanation: "Avec async/await, on utilise try/catch comme pour du code synchrone. Si la Promise est rejetée, l'erreur est capturée dans le catch. C'est plus lisible que .then().catch()." },
      { q: "Quelle est la différence entre Promise.all() et Promise.race() ?", answers: ["Il n'y a pas de différence", "all attend toutes les Promises, race retourne la première terminée", "race attend toutes, all retourne la première", "all n'existe pas"], correct: 1, explanation: "Promise.all([p1, p2]) attend que TOUTES les Promises soient résolues. Si une échoue, tout échoue. Promise.race([p1, p2]) retourne dès que LA PREMIÈRE est terminée (succès ou échec)." },
      { q: "Que se passe-t-il si on oublie 'await' devant un fetch ?", answers: ["Erreur de syntaxe", "On obtient une Promise non résolue au lieu des données", "Rien de spécial", "Le code plante"], correct: 1, explanation: "Sans await, on récupère l'objet Promise lui-même, pas ses données. C'est un bug courant : const data = fetch(url) donne une Promise, pas les données. Il faut await fetch(url)." },
      { q: "Qu'est-ce que le callback hell ?", answers: ["Un bug dans les callbacks", "Des callbacks imbriquées les unes dans les autres, difficiles à lire", "Une erreur de performance", "Un type de boucle infinie"], correct: 1, explanation: "Le 'callback hell' ou 'pyramid of doom' est le problème des callbacks imbriquées sur plusieurs niveaux, rendant le code illisible. Les Promises et async/await ont été créés pour résoudre ce problème." },
      { q: "Que retourne une fonction async si elle ne retourne rien explicitement ?", answers: ["null", "undefined", "Promise(undefined)", "void"], correct: 2, explanation: "Toute fonction async retourne une Promise. Si aucune valeur n'est retournée, elle retourne Promise.resolve(undefined). Si on fait return 42, elle retourne Promise.resolve(42)." },
      { q: "Comment lancer plusieurs requêtes en parallèle avec async/await ?", answers: ["await p1; await p2;", "await Promise.all([p1, p2])", "async.parallel([p1, p2])", "Promise.parallel([p1, p2])"], correct: 1, explanation: "await p1; await p2; attend p1 PUIS p2 (séquentiel). Pour les lancer en parallèle, on utilise Promise.all : await Promise.all([fetch(url1), fetch(url2)]) — les deux requêtes partent en même temps." },
      { q: "Quel code est correct pour récupérer des données JSON d'une API ?", answers: ["const data = fetch(url).json()", "const res = await fetch(url); const data = await res.json()", "const data = await fetch(url).json()", "const data = http.get(url)"], correct: 1, explanation: "Il faut deux await : un pour attendre la réponse HTTP, un pour lire et parser le JSON. fetch retourne une Promise de Response, et .json() retourne une Promise de données." },
    ],
  },
  react: {
    theory: "React est une bibliothèque JavaScript pour créer des interfaces. L'idée centrale : l'interface est une fonction des données. Un composant React est une fonction qui retourne du JSX (HTML dans JavaScript). useState() permet de mémoriser des données qui changent — quand l'état change, React re-rend automatiquement le composant. useEffect() exécute du code en réaction aux changements (chargement, mise à jour des données).",
    questions: [
      { q: "Qu'est-ce que le JSX en React ?", answers: ["Un nouveau langage de programmation", "Une syntaxe qui mélange JavaScript et HTML", "Un fichier de configuration", "Un type de composant"], correct: 1, explanation: "JSX permet d'écrire de l'HTML directement dans JavaScript. Babel le transforme en appels React.createElement(). C'est optionnel mais très courant car le code est plus lisible." },
      { q: "Comment créer un composant React fonctionnel ?", answers: ["class MonComp extends Component {}", "const MonComp = () => <div>Bonjour</div>;", "function: MonComp => <div>Bonjour</div>", "React.make('MonComp', <div/>)"], correct: 1, explanation: "Un composant fonctionnel est une fonction (classique ou fléchée) qui retourne du JSX. Les composants doivent commencer par une majuscule pour que React les reconnaisse." },
      { q: "À quoi sert le hook useState ?", answers: ["Faire des requêtes réseau", "Mémoriser une valeur qui peut changer et déclencher un re-rendu", "Partager des données entre composants", "Gérer les effets de bord"], correct: 1, explanation: "useState retourne une valeur et une fonction pour la modifier. Quand on appelle la fonction de mise à jour, React re-rend le composant avec la nouvelle valeur. C'est la base de l'interactivité en React." },
      { q: "Que retourne useState(0) ?", answers: ["La valeur 0", "[valeurActuelle, fonctionMiseAJour]", "{value: 0, update: fn}", "Un objet State"], correct: 1, explanation: "useState retourne un tableau de deux éléments : la valeur actuelle et une fonction pour la modifier. On le déstructure : const [count, setCount] = useState(0)." },
      { q: "Comment passer des données à un composant enfant ?", answers: ["Via des variables globales", "Via les props (propriétés)", "Via localStorage", "Via useState partagé"], correct: 1, explanation: "Les props sont des attributs passés à un composant : <MonComp nom='Alice' age={25} />. Dans MonComp, on les reçoit en paramètre : function MonComp({ nom, age }) {...}." },
      { q: "Quand utilise-t-on useEffect ?", answers: ["Pour créer des animations", "Pour exécuter du code en réaction au rendu ou aux changements de données", "Pour remplacer useState", "Pour gérer les formulaires"], correct: 1, explanation: "useEffect exécute une fonction après chaque rendu. Le tableau de dépendances contrôle quand il s'exécute : [] une seule fois au montage, [variable] à chaque changement de variable, rien = à chaque rendu." },
      { q: "Que signifie le tableau vide [] dans useEffect(() => {}, []) ?", answers: ["L'effet ne s'exécute jamais", "L'effet s'exécute à chaque rendu", "L'effet s'exécute une seule fois au montage du composant", "L'effet s'exécute seulement au démontage"], correct: 2, explanation: "[] (tableau vide) signifie 'aucune dépendance' — l'effet s'exécute une seule fois quand le composant est monté. C'est équivalent à componentDidMount dans les classes React." },
      { q: "Comment afficher une liste en React ?", answers: ["<for> item in items </for>", "{items.forEach(item => <li>{item}</li>)}", "{items.map(item => <li key={item.id}>{item.name}</li>)}", "<List items={items} />"], correct: 2, explanation: ".map() retourne un tableau de JSX. La prop 'key' est obligatoire sur chaque élément d'une liste — React l'utilise pour optimiser les mises à jour. Elle doit être unique et stable." },
      { q: "Quelle est la règle numéro 1 des hooks React ?", answers: ["Toujours les importer depuis 'react'", "Les appeler uniquement au niveau supérieur du composant, pas dans des if/for", "Les nommer avec un 'use' minuscule", "Les utiliser une seule fois par composant"], correct: 1, explanation: "Les hooks doivent être appelés dans le même ordre à chaque rendu. On ne peut pas les mettre dans des conditions (if), des boucles ou des fonctions imbriquées — React en dépend pour garder l'état cohérent." },
      { q: "Comment empêcher un re-rendu inutile d'un composant fils ?", answers: ["useCallback()", "useState(false)", "React.memo()", "useRef()"], correct: 2, explanation: "React.memo() mémoïse un composant : il ne se re-rend que si ses props changent. useCallback() mémoïse une fonction, useMemo() une valeur calculée — utiles pour optimiser les performances." },
      { q: "Que fait le hook useRef ?", answers: ["Re-rend le composant quand la valeur change", "Crée une référence mutable qui persiste sans provoquer de re-rendu", "Référence un state d'un autre composant", "Fait un fetch automatiquement"], correct: 1, explanation: "useRef crée un objet { current: valeur } qui persiste entre les rendus. Modifier .current ne déclenche PAS de re-rendu. Très utile pour accéder à un élément DOM ou stocker une valeur sans re-rendu." },
      { q: "Comment mettre à jour un objet dans un state React ?", answers: ["state.prop = newValue", "setState.push(newValue)", "setObj({ ...obj, prop: newValue })", "obj.update(prop, newValue)"], correct: 2, explanation: "Il ne faut jamais muter directement le state. On crée un nouvel objet avec le spread : { ...obj, prop: newValue }. Cela crée une copie avec la propriété modifiée, que React peut détecter comme un changement." },
      { q: "Qu'est-ce que le Context API React ?", answers: ["Un outil pour faire des requêtes API", "Un système pour partager des données entre composants sans prop drilling", "Une alternative aux hooks", "Un gestionnaire d'état externe"], correct: 1, explanation: "Le Context API permet de partager des données (thème, langue, utilisateur connecté) accessibles dans tout l'arbre de composants, sans passer les props manuellement à chaque niveau." },
      { q: "Que signifie 'prop drilling' ?", answers: ["Une technique d'optimisation", "Passer des props à travers plusieurs composants intermédiaires qui n'en ont pas besoin", "Un type de bug React", "L'accès aux props du composant parent"], correct: 1, explanation: "Le prop drilling est le problème de passer une prop à travers une longue chaîne de composants intermédiaires. Context, Redux ou Zustand sont des solutions pour éviter ça." },
    ],
  },
  nodejs: {
    theory: "Node.js permet d'exécuter JavaScript côté serveur, hors du navigateur. Il est non-bloquant : pendant qu'il attend une réponse réseau ou un fichier, il continue de traiter d'autres requêtes. npm (Node Package Manager) gère les bibliothèques du projet — elles sont listées dans package.json et installées dans node_modules. Express est le framework web le plus populaire pour créer des API avec Node.js.",
    questions: [
      { q: "Que fait 'npm init -y' ?", answers: ["Installe Node.js", "Initialise un projet avec un package.json par défaut", "Lance le serveur Node", "Installe tous les packages"], correct: 1, explanation: "npm init -y crée un fichier package.json avec les valeurs par défaut. Ce fichier décrit le projet (nom, version) et liste ses dépendances. C'est la première étape de tout projet Node.js." },
      { q: "Comment installer un package npm ?", answers: ["npm add express", "npm get express", "npm install express", "node install express"], correct: 2, explanation: "npm install express (ou npm i express) télécharge le package dans node_modules et l'ajoute aux dependencies du package.json. --save-dev (ou -D) l'ajoute aux devDependencies." },
      { q: "À quoi sert le fichier .gitignore avec Node ?", answers: ["Ignorer les erreurs Node", "Exclure node_modules du dépôt Git", "Configurer npm", "Définir les scripts"], correct: 1, explanation: "node_modules peut contenir des milliers de fichiers et fait souvent plusieurs centaines de mégaoctets. On l'exclut du dépôt Git — npm install peut le recréer à partir du package.json." },
      { q: "Comment créer un serveur HTTP simple avec Node ?", answers: ["const server = node.createServer(fn)", "const server = http.createServer(fn); server.listen(3000)", "server.start(3000)", "express.listen(3000)"], correct: 1, explanation: "Le module 'http' natif de Node permet de créer un serveur. En pratique, on utilise Express qui simplifie la création de routes, la gestion des requêtes et des réponses." },
      { q: "Que contient 'node_modules' ?", answers: ["Le code source de Node.js", "Les dépendances installées via npm", "Les fichiers de configuration", "Les tests du projet"], correct: 1, explanation: "node_modules contient tous les packages installés par npm et leurs propres dépendances. Ce dossier ne doit jamais être modifié manuellement ni commité dans Git." },
      { q: "Quelle est la différence entre require() et import ?", answers: ["Aucune", "require est CommonJS (ancienne syntaxe), import est ES Modules (moderne)", "import est plus lent", "require ne fonctionne qu'avec des packages npm"], correct: 1, explanation: "require() est la syntaxe CommonJS historique de Node. import/export est la syntaxe ES Modules moderne, maintenant supportée par Node avec l'extension .mjs ou en ajoutant 'type: module' au package.json." },
      { q: "Que fait process.env.PORT ?", answers: ["Définit le port du serveur", "Lit la variable d'environnement PORT", "Lance une instance Node sur ce port", "Teste si un port est disponible"], correct: 1, explanation: "process.env donne accès aux variables d'environnement système. PORT est souvent définie par la plateforme d'hébergement (Heroku, Railway). On écrit const port = process.env.PORT || 3000 pour avoir une valeur par défaut." },
      { q: "Comment lire un fichier en Node.js ?", answers: ["file.read('data.txt')", "fs.readFile('data.txt', 'utf8', callback)", "open('data.txt')", "io.read('data.txt')"], correct: 1, explanation: "Le module 'fs' (file system) permet de lire et écrire des fichiers. fs.readFile est asynchrone (non-bloquant). fs.readFileSync est synchrone. Avec les Promises modernes : await fs.promises.readFile('data.txt', 'utf8')." },
      { q: "Quelle est la différence entre dependencies et devDependencies ?", answers: ["Aucune différence en pratique", "dependencies : en production ; devDependencies : seulement en développement", "devDependencies sont plus récentes", "dependencies sont optionnelles"], correct: 1, explanation: "dependencies (express, prisma) sont nécessaires en production. devDependencies (jest, eslint, typescript) sont des outils de développement. npm install --production ignore les devDependencies." },
      { q: "Que fait express.json() comme middleware ?", answers: ["Convertit les réponses en JSON", "Parse automatiquement le corps des requêtes JSON", "Valide le format JSON", "Envoie les réponses en JSON"], correct: 1, explanation: "app.use(express.json()) est un middleware qui lit le corps des requêtes POST/PUT et le convertit en objet JavaScript accessible via req.body. Sans lui, req.body est undefined." },
      { q: "Quel script npm lance généralement un serveur en développement ?", answers: ["npm run dev ou npm start", "npm launch", "node --dev", "npm server"], correct: 0, explanation: "Les scripts npm sont définis dans package.json sous 'scripts'. 'npm start' est conventionnel pour la production. 'npm run dev' utilise souvent nodemon qui redémarre le serveur à chaque modification." },
      { q: "Qu'est-ce qu'un middleware Express ?", answers: ["Une bibliothèque externe", "Une fonction qui s'exécute entre la requête et la réponse", "Un type de route", "Un gestionnaire d'erreurs"], correct: 1, explanation: "Un middleware est une fonction (req, res, next) qui s'exécute avant d'arriver à la route finale. Il peut modifier req/res, logger, vérifier l'authentification, parser le corps... Il appelle next() pour passer au suivant." },
      { q: "Comment définir une route GET avec Express ?", answers: ["app.route('/path', fn)", "app.get('/path', (req, res) => res.json({}))", "express.listen('/path', fn)", "app.handle('GET', '/path', fn)"], correct: 1, explanation: "app.get(chemin, handler) définit une route GET. Le handler reçoit req (requête) et res (réponse). res.json() envoie une réponse JSON. res.send() envoie du texte. res.status(404).json() pour les erreurs." },
    ],
  },
  sql: {
    theory: "SQL permet d'interroger et de modifier des bases de données relationnelles. Une base de données organise les données en tables (comme des feuilles de calcul). La requête de base : SELECT colonnes FROM table WHERE condition. INSERT ajoute des lignes, UPDATE les modifie, DELETE les supprime. Les jointures (JOIN) permettent de combiner des données de plusieurs tables liées par des clés.",
    questions: [
      { q: "Quelle requête SQL récupère toutes les lignes d'une table ?", answers: ["GET * FROM users", "FETCH ALL FROM users", "SELECT * FROM users", "READ users"], correct: 2, explanation: "SELECT * FROM users retourne toutes les colonnes de toutes les lignes de la table users. L'étoile (*) signifie 'toutes les colonnes'. Pour limiter : SELECT nom, email FROM users." },
      { q: "Comment filtrer les résultats en SQL ?", answers: ["SELECT * FROM users FILTER age > 18", "SELECT * FROM users IF age > 18", "SELECT * FROM users HAVING age > 18", "SELECT * FROM users WHERE age > 18"], correct: 3, explanation: "WHERE filtre les lignes selon une condition. SELECT * FROM users WHERE age > 18 retourne seulement les adultes. On peut combiner : WHERE age > 18 AND pays = 'France'." },
      { q: "Comment trier les résultats par ordre alphabétique ?", answers: ["SELECT * FROM users SORT BY nom", "SELECT * FROM users ORDER BY nom ASC", "SELECT * FROM users ARRANGE BY nom", "SELECT * FROM users GROUP BY nom"], correct: 1, explanation: "ORDER BY trie les résultats. ASC (croissant) est la valeur par défaut. DESC trie en ordre décroissant. On peut trier par plusieurs colonnes : ORDER BY nom ASC, prenom DESC." },
      { q: "Comment compter le nombre de lignes dans une table ?", answers: ["SELECT LENGTH(users)", "SELECT TOTAL FROM users", "SELECT COUNT(*) FROM users", "SELECT SIZE(users)"], correct: 2, explanation: "COUNT(*) compte toutes les lignes. COUNT(email) compte les lignes où email n'est pas NULL. On peut l'utiliser avec GROUP BY pour compter par groupe : SELECT pays, COUNT(*) FROM users GROUP BY pays." },
      { q: "Quelle requête insère une nouvelle ligne dans une table ?", answers: ["ADD INTO users VALUES (...)", "CREATE ROW users (...)", "INSERT INTO users (nom, email) VALUES ('Alice', 'alice@mail.com')", "PUT users (nom, email) = ('Alice', 'alice@mail.com')"], correct: 2, explanation: "INSERT INTO spécifie la table et les colonnes. VALUES donne les valeurs correspondantes dans le même ordre. Il est recommandé de toujours préciser les noms des colonnes." },
      { q: "Comment modifier une ligne existante ?", answers: ["MODIFY users SET email = 'new@mail.com' WHERE id = 1", "CHANGE users email = 'new@mail.com' WHERE id = 1", "UPDATE users SET email = 'new@mail.com' WHERE id = 1", "EDIT users SET email = 'new@mail.com' WHERE id = 1"], correct: 2, explanation: "UPDATE modifie des lignes existantes. ATTENTION : toujours ajouter WHERE, sinon toutes les lignes sont modifiées ! UPDATE users SET email = 'new@mail.com' WHERE id = 1 modifie seulement l'utilisateur 1." },
      { q: "Qu'est-ce qu'une clé primaire (PRIMARY KEY) ?", answers: ["La colonne la plus importante de la table", "Un identifiant unique pour chaque ligne", "La première colonne de la table", "Un index de recherche"], correct: 1, explanation: "La clé primaire identifie de façon unique chaque ligne. Elle ne peut pas être NULL ni dupliquée. C'est souvent un id auto-incrémenté (INTEGER PRIMARY KEY AUTOINCREMENT)." },
      { q: "Que fait INNER JOIN ?", answers: ["Retourne toutes les lignes des deux tables", "Retourne seulement les lignes avec une correspondance dans les deux tables", "Fusionne deux tables en une seule", "Copie une table dans une autre"], correct: 1, explanation: "INNER JOIN retourne l'intersection : les lignes qui ont une correspondance dans les DEUX tables. LEFT JOIN garde aussi les lignes de la table gauche sans correspondance (avec NULL pour les colonnes de droite)." },
      { q: "Comment limiter le nombre de résultats d'une requête ?", answers: ["SELECT TOP 10 * FROM users", "SELECT * FROM users MAX 10", "SELECT * FROM users LIMIT 10", "SELECT * FROM users TAKE 10"], correct: 2, explanation: "LIMIT n retourne les n premières lignes. Pour la pagination : LIMIT 10 OFFSET 20 retourne les lignes 21 à 30. TOP est la syntaxe SQL Server (Microsoft), LIMIT est standard (MySQL, PostgreSQL, SQLite)." },
      { q: "Quelle fonction SQL calcule la moyenne d'une colonne ?", answers: ["MEAN(salaire)", "AVERAGE(salaire)", "AVG(salaire)", "MED(salaire)"], correct: 2, explanation: "AVG() calcule la moyenne d'une colonne numérique. Autres fonctions d'agrégation : SUM() (somme), MIN() (minimum), MAX() (maximum), COUNT() (nombre de lignes)." },
      { q: "Comment supprimer toutes les lignes d'une table (sans supprimer la table) ?", answers: ["DROP TABLE users", "DELETE TABLE users", "DELETE FROM users", "CLEAR TABLE users"], correct: 2, explanation: "DELETE FROM users sans WHERE supprime toutes les lignes. DROP TABLE users supprime la table entière (structure + données). TRUNCATE TABLE users vide la table plus rapidement mais n'est pas dans toutes les bases." },
      { q: "Que fait GROUP BY en SQL ?", answers: ["Trie les résultats par groupe", "Regroupe les lignes ayant la même valeur pour des agrégations", "Filtre les groupes", "Crée des sous-tables"], correct: 1, explanation: "GROUP BY regroupe les lignes qui ont la même valeur dans une colonne. On l'utilise avec des fonctions d'agrégation : SELECT pays, COUNT(*) FROM users GROUP BY pays donne le nombre d'utilisateurs par pays." },
      { q: "Quelle clause filtre les groupes créés par GROUP BY ?", answers: ["WHERE", "FILTER", "HAVING", "AFTER GROUP"], correct: 2, explanation: "HAVING filtre APRÈS le GROUP BY, sur des valeurs agrégées. WHERE filtre AVANT le GROUP BY, sur des lignes individuelles. Ex: HAVING COUNT(*) > 5 pour ne garder que les groupes de plus de 5 éléments." },
    ],
  },
  git: {
    theory: "Git est un outil qui enregistre l'historique complet des modifications d'un projet. Chaque 'commit' est une photo de l'état du projet à un instant donné. Les branches permettent de travailler sur une fonctionnalité sans toucher au code principal. Le workflow typique : on modifie des fichiers, on les ajoute à la 'zone de staging' avec git add, puis on crée un commit avec git commit. git push envoie les commits sur un dépôt distant comme GitHub.",
    questions: [
      { q: "Quelle commande initialise un nouveau dépôt Git ?", answers: ["git start", "git create", "git init", "git new"], correct: 2, explanation: "git init crée un dépôt Git dans le dossier courant — un dossier .git est créé. git clone URL crée une copie locale complète d'un dépôt distant existant." },
      { q: "Quelle commande prépare des fichiers pour le prochain commit ?", answers: ["git commit file.txt", "git stage file.txt", "git add file.txt", "git save file.txt"], correct: 2, explanation: "git add place les fichiers dans la 'zone de staging' (index). Seuls les fichiers stagés seront inclus dans le prochain commit. git add . ajoute tous les fichiers modifiés d'un coup." },
      { q: "Comment créer un commit avec un message ?", answers: ["git save -m 'message'", "git commit -m 'message'", "git push -m 'message'", "git snapshot 'message'"], correct: 1, explanation: "git commit -m 'message' crée un commit avec les fichiers stagés. Un bon message de commit décrit ce qui a changé et pourquoi. Convention : 'feat: ajout du bouton de connexion' ou 'fix: correction du bug d'affichage'." },
      { q: "Que fait git push ?", answers: ["Télécharge les commits distants", "Envoie vos commits locaux vers le dépôt distant", "Fusionne les branches", "Crée un nouveau dépôt"], correct: 1, explanation: "git push envoie vos commits locaux vers le dépôt distant (GitHub, GitLab...). Après un push, vos collègues peuvent récupérer vos modifications avec git pull." },
      { q: "Que fait git pull ?", answers: ["Envoie les commits au serveur", "Récupère et fusionne les changements du dépôt distant", "Crée une nouvelle branche", "Télécharge seulement sans fusionner"], correct: 1, explanation: "git pull = git fetch + git merge. Il récupère les nouveaux commits du dépôt distant et les fusionne dans votre branche locale. À faire avant de commencer à travailler pour être à jour." },
      { q: "Comment créer et basculer sur une nouvelle branche ?", answers: ["git create new-feature", "git branch new-feature", "git checkout -b new-feature", "git switch --create new-feature"], correct: 2, explanation: "git checkout -b nom crée la branche ET y bascule immédiatement. La commande moderne est git switch -c nom. git branch nom crée la branche sans y basculer." },
      { q: "Que fait git status ?", answers: ["Affiche les statistiques du projet", "Montre les fichiers modifiés, stagés et non-trackés", "Liste tous les commits", "Affiche l'état du réseau"], correct: 1, explanation: "git status montre quels fichiers ont été modifiés, lesquels sont dans la zone de staging, et lesquels ne sont pas encore trackés par Git. C'est la commande à taper le plus souvent." },
      { q: "Comment voir l'historique des commits ?", answers: ["git history", "git show", "git log", "git commits"], correct: 2, explanation: "git log affiche l'historique des commits avec leurs hash, auteurs, dates et messages. git log --oneline affiche une version condensée. git log --graph visualise les branches." },
      { q: "Que fait git stash ?", answers: ["Supprime les modifications non commitées", "Sauvegarde temporairement les modifications pour les restaurer plus tard", "Crée un commit automatique", "Archive le projet"], correct: 1, explanation: "git stash met de côté les modifications en cours (non commitées) pour 'nettoyer' le working directory. Très utile pour changer de branche rapidement. git stash pop restaure les modifications." },
      { q: "Quelle est la branche principale conventionnelle d'un projet Git ?", answers: ["dev", "production", "master ou main", "root"], correct: 2, explanation: "Historiquement 'master', GitHub et d'autres plateformes sont passées à 'main' par défaut depuis 2020. Les deux noms sont valides — c'est juste une convention." },
      { q: "Que fait git merge ma-branche ?", answers: ["Supprime la branche", "Fusionne ma-branche dans la branche actuelle", "Renomme la branche", "Copie les commits sans fusionner"], correct: 1, explanation: "git merge fusionne une branche dans la branche courante. Si les mêmes lignes ont été modifiées dans les deux branches, Git crée un conflit qu'il faut résoudre manuellement." },
      { q: "Comment annuler les modifications non commitées d'un fichier ?", answers: ["git undo file.txt", "git reset --hard file.txt", "git checkout -- file.txt", "git restore file.txt"], correct: 3, explanation: "git restore file.txt (ou l'ancienne syntaxe git checkout -- file.txt) restaure le fichier à son état lors du dernier commit. Attention : les modifications non commitées sont perdues définitivement." },
      { q: "Qu'est-ce qu'un conflit Git ?", answers: ["Une erreur de connexion avec GitHub", "Deux branches modifiant les mêmes lignes de code", "Un commit invalide", "Une branche corrompue"], correct: 1, explanation: "Un conflit survient quand deux branches ont modifié les mêmes lignes d'un fichier. Git ne peut pas décider automatiquement quelle version garder — il marque le fichier et l'humain doit choisir." },
    ],
  },
  docker: {
    theory: "Docker empaquette une application et tout ce dont elle a besoin (code, bibliothèques, configuration) dans un 'conteneur' — une boîte isolée et reproductible. Un conteneur peut tourner sur n'importe quelle machine avec Docker installé, toujours de la même façon. L'image Docker est le modèle (template) — un conteneur est une instance en cours d'exécution de cette image. docker-compose orchestre plusieurs conteneurs qui fonctionnent ensemble.",
    questions: [
      { q: "Quelle est la différence entre une image et un conteneur Docker ?", answers: ["Aucune", "L'image est le modèle, le conteneur est une instance en cours d'exécution", "Le conteneur est stocké, l'image tourne", "L'image est plus grande que le conteneur"], correct: 1, explanation: "L'image est un modèle immuable (comme une recette). Le conteneur est une instance en cours d'exécution de cette image (comme un plat cuisiné). On peut créer plusieurs conteneurs à partir d'une même image." },
      { q: "Quelle commande lance un conteneur Docker en arrière-plan ?", answers: ["docker start -bg image", "docker launch image", "docker run -d image", "docker exec -d image"], correct: 2, explanation: "docker run crée et démarre un nouveau conteneur. -d (detached) le lance en arrière-plan. Sans -d, les logs s'affichent dans le terminal. --name donne un nom au conteneur." },
      { q: "Que contient un Dockerfile ?", answers: ["Les données de l'application", "Les instructions pour construire une image Docker", "La configuration réseau", "Les variables d'environnement"], correct: 1, explanation: "Un Dockerfile est la recette de l'image. Les instructions les plus courantes : FROM (image de base), COPY (copier des fichiers), RUN (exécuter des commandes), CMD (commande de démarrage)." },
      { q: "Quelle commande affiche les conteneurs en cours d'exécution ?", answers: ["docker ls", "docker list", "docker ps", "docker show"], correct: 2, explanation: "docker ps liste les conteneurs actifs. docker ps -a liste aussi les conteneurs arrêtés. docker images liste les images locales disponibles." },
      { q: "Que fait l'instruction FROM dans un Dockerfile ?", answers: ["Définit le nom de l'image", "Spécifie l'image de base sur laquelle construire", "Importe des fichiers", "Ouvre un port"], correct: 1, explanation: "FROM est toujours la première instruction d'un Dockerfile. Elle spécifie l'image de départ : FROM node:20 utilise l'image officielle Node.js version 20. FROM python:3.11-slim pour Python." },
      { q: "Quelle commande arrête un conteneur en cours ?", answers: ["docker kill", "docker end", "docker stop nom_conteneur", "docker pause nom_conteneur"], correct: 2, explanation: "docker stop envoie un signal SIGTERM pour arrêter proprement le conteneur. docker kill envoie SIGKILL pour arrêter immédiatement (peut corrompre des données). docker rm supprime le conteneur arrêté." },
      { q: "À quoi sert un volume Docker ?", answers: ["Augmenter la RAM du conteneur", "Persister des données en dehors du conteneur", "Partager le réseau entre conteneurs", "Compresser l'image"], correct: 1, explanation: "Les données dans un conteneur sont perdues quand il s'arrête. Les volumes sont des dossiers sur l'hôte montés dans le conteneur — les données persistent. Essentiel pour les bases de données." },
      { q: "Que fait docker build -t mon-app . ?", answers: ["Télécharge l'image mon-app", "Lance un conteneur", "Construit une image depuis le Dockerfile du dossier courant", "Met à jour les dépendances"], correct: 2, explanation: "-t donne un nom à l'image (tag). Le point (.) indique que le contexte de build est le dossier courant (là où se trouve le Dockerfile). La commande lit le Dockerfile et construit l'image." },
      { q: "Que fait l'instruction EXPOSE dans un Dockerfile ?", answers: ["Ouvre automatiquement le port sur l'hôte", "Documente le port utilisé par l'application", "Bloque les autres ports", "Configure le réseau Docker"], correct: 1, explanation: "EXPOSE documente quel port l'application écoute à l'intérieur du conteneur. Mais ça ne publie pas le port sur la machine hôte — pour ça, on utilise -p 8080:3000 dans docker run." },
      { q: "Que fait docker-compose up ?", answers: ["Met à jour Docker", "Lance tous les services définis dans docker-compose.yml", "Construit les images seulement", "Liste les services disponibles"], correct: 1, explanation: "docker-compose up démarre tous les conteneurs définis dans docker-compose.yml. -d pour les lancer en arrière-plan. docker-compose down les arrête et les supprime." },
      { q: "Quelle est l'avantage des conteneurs sur les machines virtuelles ?", answers: ["Les conteneurs sont plus sécurisés", "Les conteneurs partagent le kernel de l'hôte — ils sont plus légers et démarrent plus vite", "Les conteneurs ont plus de RAM", "Les conteneurs sont plus faciles à pirater"], correct: 1, explanation: "Une VM inclut tout un système d'exploitation — elle est lourde (Go de RAM, minutes pour démarrer). Un conteneur partage le kernel de l'hôte — il est léger (Mo de RAM, secondes pour démarrer)." },
      { q: "Que fait docker pull nginx ?", answers: ["Lance un conteneur nginx", "Construit l'image nginx", "Télécharge l'image nginx depuis Docker Hub", "Met à jour nginx"], correct: 2, explanation: "docker pull télécharge une image depuis Docker Hub (ou un autre registry). docker run télécharge automatiquement l'image si elle n'est pas présente localement." },
    ],
  },
  jwt: {
    theory: "JWT (JSON Web Token) est un format de token utilisé pour l'authentification. Quand un utilisateur se connecte, le serveur crée un JWT signé contenant ses informations (id, rôle) et le renvoie. Le client stocke ce token et le joint à chaque requête dans l'en-tête Authorization: Bearer <token>. Le serveur vérifie la signature du token sans avoir besoin d'interroger la base de données.",
    questions: [
      { q: "De combien de parties est composé un JWT ?", answers: ["1 seule chaîne", "2 (header.payload)", "3 (header.payload.signature)", "4"], correct: 2, explanation: "Un JWT a 3 parties séparées par des points : Header (algorithme de signature), Payload (données/claims), Signature (vérification d'intégrité). Ex: eyJ...header.eyJ...payload.signature" },
      { q: "Le payload d'un JWT est-il chiffré ?", answers: ["Oui, toujours", "Non, juste encodé en Base64 — lisible par tout le monde", "Oui, avec AES-256", "Seulement si on le demande"], correct: 1, explanation: "Le payload est encodé en Base64URL, pas chiffré. N'importe qui peut le décoder et lire son contenu. Ne jamais mettre de données sensibles (mot de passe, numéro de carte) dans un JWT." },
      { q: "À quoi sert la signature d'un JWT ?", answers: ["Chiffrer les données", "Vérifier que le token n'a pas été modifié", "Identifier l'algorithme", "Compresser le token"], correct: 1, explanation: "La signature est créée avec la clé secrète du serveur. Si quelqu'un modifie le payload, la signature ne correspond plus. Le serveur détecte la falsification sans interroger la base de données." },
      { q: "Qu'est-ce que le claim 'exp' dans un JWT ?", answers: ["L'expéditeur (expediteur)", "L'identifiant unique du token", "La date d'expiration du token", "L'algorithme de chiffrement"], correct: 2, explanation: "'exp' est le claim d'expiration — un timestamp Unix. Un token expiré doit être rejeté même si la signature est valide. Des tokens courts (15-60 min) réduisent les risques en cas de vol." },
      { q: "Où est-il recommandé de stocker un JWT côté client ?", answers: ["Dans l'URL", "Dans localStorage", "Dans un cookie httpOnly", "Dans sessionStorage"], correct: 2, explanation: "Un cookie httpOnly n'est pas accessible au JavaScript — protège contre les attaques XSS. localStorage est vulnérable : tout script sur la page peut lire son contenu. Combiner avec SameSite=Strict pour le CSRF." },
      { q: "Que vérifie le serveur quand il reçoit un JWT ?", answers: ["Il interroge la base de données", "Il recalcule la signature et vérifie l'expiration", "Il contacte un service d'auth externe", "Il déchiffre le token"], correct: 1, explanation: "Le serveur recalcule la signature avec sa clé secrète et compare. Si elles correspondent et que exp est dans le futur, le token est valide. Pas besoin de BDD — c'est l'avantage du JWT : stateless." },
      { q: "Quelle est la valeur correcte de l'en-tête Authorization avec un JWT ?", answers: ["Authorization: JWT token", "Authorization: Bearer token", "Authorization: Token token", "Authorization: Basic token"], correct: 1, explanation: "La convention est Authorization: Bearer <votre_token>. Le serveur lit cet en-tête, extrait le token après 'Bearer ', et le valide." },
      { q: "Qu'est-ce qu'un refresh token ?", answers: ["Un token qui se rafraîchit automatiquement", "Un token de longue durée pour obtenir de nouveaux access tokens sans re-login", "Un token plus sécurisé", "Un token pour les APIs publiques"], correct: 1, explanation: "L'access token a une courte durée (15-60 min). Le refresh token dure plus longtemps (jours, semaines). Quand l'access token expire, on utilise le refresh token pour en obtenir un nouveau sans que l'utilisateur se reconnecte." },
      { q: "Quelle est la faiblesse principale du JWT ?", answers: ["Il est trop lent", "Une fois émis, impossible de l'invalider avant expiration (sauf liste noire)", "Il ne supporte pas le HTTPS", "Il ne fonctionne qu'avec Express"], correct: 1, explanation: "JWT est stateless : le serveur ne garde pas trace des tokens émis. Impossible d'invalider un token (déconnexion forcée, changement de mot de passe) sans maintenir une liste noire — ce qui annule l'avantage stateless." },
      { q: "Que signifie 'stateless' dans le contexte de JWT ?", answers: ["L'application n'a pas de state React", "Le serveur n'a pas besoin de stocker l'état de session en base", "Le token ne contient aucune information", "L'authentification ne fonctionne pas hors ligne"], correct: 1, explanation: "Stateless signifie que le serveur n'a pas besoin de mémoriser les sessions en base de données. Toutes les informations nécessaires sont dans le token lui-même, ce qui facilite la scalabilité horizontale." },
      { q: "Quel algorithme est le plus couramment utilisé pour signer un JWT ?", answers: ["MD5", "AES-256", "HS256 (HMAC-SHA256)", "RSA-4096"], correct: 2, explanation: "HS256 (HMAC avec SHA-256) est le plus courant — il utilise une clé secrète symétrique partagée entre émetteur et vérificateur. RS256 utilise une paire de clés publique/privée, utile pour plusieurs services." },
    ],
  },
  // ── HTTP ─────────────────────────────────────────────────────────────────
  http: {
    theory: "HTTP (HyperText Transfer Protocol) est le protocole de communication du web. Une requête HTTP comporte une méthode (GET, POST, PUT, DELETE), une URL, des en-têtes (headers) et parfois un corps (body). Le serveur répond avec un code de statut : 2xx (succès), 3xx (redirection), 4xx (erreur client), 5xx (erreur serveur). HTTPS ajoute le chiffrement TLS pour sécuriser les échanges.",
    questions: [
      { q: "Que signifie le code HTTP 404 ?", answers: ["Serveur indisponible", "Ressource non trouvée", "Accès interdit", "Requête invalide"], correct: 1, explanation: "404 Not Found : la ressource demandée n'existe pas sur le serveur. 403 Forbidden : accès refusé. 500 Internal Server Error : erreur côté serveur.", difficulty: 1 },
      { q: "Quelle méthode HTTP est idempotente et utilisée pour lire une ressource ?", answers: ["POST", "PUT", "GET", "PATCH"], correct: 2, explanation: "GET récupère une ressource sans la modifier. Elle est idempotente (plusieurs appels donnent le même résultat) et sûre (pas d'effet de bord).", difficulty: 1 },
      { q: "Que contient le corps (body) d'une requête POST ?", answers: ["Les paramètres d'URL", "Les données envoyées au serveur", "Les en-têtes de réponse", "Le code de statut"], correct: 1, explanation: "Le body contient les données transmises, souvent en JSON ou form-data. GET n'a pas de body — les données passent par l'URL (query string).", difficulty: 1 },
      { q: "Quelle différence entre HTTP et HTTPS ?", answers: ["HTTPS est plus rapide", "HTTPS chiffre les données avec TLS", "HTTP utilise le port 443", "HTTPS ne supporte pas POST"], correct: 1, explanation: "HTTPS = HTTP + TLS (chiffrement). Les données transitent de façon chiffrée et le certificat SSL/TLS authentifie le serveur. Indispensable pour les données sensibles.", difficulty: 1 },
      { q: "Quel code HTTP indique une création réussie ?", answers: ["200 OK", "201 Created", "204 No Content", "202 Accepted"], correct: 1, explanation: "201 Created est renvoyé après un POST qui a créé une ressource. 200 OK est pour les GET réussis. 204 No Content pour les DELETE réussis sans corps de réponse.", difficulty: 2 },
    ],
  },
  // ── JS Events ────────────────────────────────────────────────────────────
  "js-events": {
    theory: "Les événements JavaScript permettent de réagir aux actions utilisateur. addEventListener(type, handler) attache un écouteur. Les événements les plus courants : click, input, submit, keydown, mouseover, resize, load. L'objet événement (event) contient des infos sur l'interaction. preventDefault() bloque le comportement par défaut (ex : soumission de formulaire). La délégation d'événements consiste à écouter un parent commun plutôt que chaque enfant.",
    questions: [
      { q: "Comment attacher un gestionnaire d'événement 'click' à un bouton ?", answers: ["button.click = fn", "button.on('click', fn)", "button.addEventListener('click', fn)", "button.handle('click', fn)"], correct: 2, explanation: "addEventListener est la méthode moderne. Elle permet d'attacher plusieurs handlers au même événement, contrairement à onclick qui en accepte un seul.", difficulty: 1 },
      { q: "Que fait event.preventDefault() ?", answers: ["Stoppe la propagation", "Empêche le comportement par défaut du navigateur", "Supprime l'écouteur d'événement", "Annule l'événement pour tous les éléments"], correct: 1, explanation: "preventDefault() bloque l'action native : soumission de formulaire, navigation d'un lien, etc. Essentiel pour gérer les formulaires avec JavaScript.", difficulty: 1 },
      { q: "Qu'est-ce que le 'bubbling' des événements ?", answers: ["Un type d'événement spécial", "La remontée de l'événement vers les éléments parents", "L'animation d'un élément cliqué", "La duplication d'un événement"], correct: 1, explanation: "Après déclenchement sur un enfant, l'événement 'remonte' vers les parents. event.stopPropagation() arrête cette remontée. La délégation d'événements exploite ce mécanisme.", difficulty: 2 },
      { q: "Quel événement se déclenche à chaque frappe dans un input ?", answers: ["change", "keypress", "input", "type"], correct: 2, explanation: "'input' se déclenche immédiatement à chaque modification. 'change' se déclenche seulement quand l'utilisateur quitte le champ. Pour un feedback temps réel, utilisez 'input'.", difficulty: 1 },
      { q: "Qu'est-ce que la délégation d'événements ?", answers: ["Déléguer un événement à un autre script", "Écouter les événements sur un parent commun plutôt que sur chaque enfant", "Créer des événements personnalisés", "Partager des événements entre onglets"], correct: 1, explanation: "Au lieu d'ajouter un listener sur chaque item d'une liste, on en ajoute un seul sur le parent. On utilise event.target pour identifier l'élément cliqué. Performant pour les listes dynamiques.", difficulty: 2 },
    ],
  },
  // ── JS Fetch ─────────────────────────────────────────────────────────────
  "js-fetch": {
    theory: "L'API Fetch permet de faire des requêtes HTTP depuis le navigateur. fetch(url) retourne une Promise. La réponse (Response) contient response.ok, response.status et des méthodes comme response.json(). On utilise async/await pour un code lisible. Pour les requêtes POST, on passe un objet options avec method, headers et body (JSON.stringify pour les données).",
    questions: [
      { q: "Que retourne fetch(url) ?", answers: ["Les données JSON directement", "Une Promise de Response", "Un objet XMLHttpRequest", "null si l'URL est invalide"], correct: 1, explanation: "fetch retourne une Promise qui se résout en objet Response. Il faut ensuite appeler response.json() (aussi une Promise) pour obtenir les données parsées.", difficulty: 1 },
      { q: "Comment envoyer du JSON avec fetch en POST ?", answers: ["fetch(url, {data: obj})", "fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(obj)})", "fetch.post(url, obj)", "fetch(url, {json: obj})"], correct: 1, explanation: "Il faut explicitement définir la méthode, l'en-tête Content-Type et sérialiser le body avec JSON.stringify. Le serveur saura alors parser le JSON.", difficulty: 2 },
      { q: "Comment vérifier si une requête fetch a réussi ?", answers: ["if (response)", "if (response.ok)", "if (!response.error)", "try/catch uniquement"], correct: 1, explanation: "response.ok est true si le statut est entre 200 et 299. fetch ne rejette PAS la Promise pour les erreurs HTTP (404, 500) — il faut vérifier response.ok manuellement.", difficulty: 2 },
      { q: "Quel code correctement récupère du JSON depuis une API ?", answers: ["const data = fetch(url).json()", "const res = await fetch(url); const data = await res.json()", "const data = await fetch(url)", "fetch(url).then(data => data)"], correct: 1, explanation: "Deux await sont nécessaires : un pour la réponse HTTP, un pour parser le JSON. res.json() retourne une nouvelle Promise.", difficulty: 1 },
      { q: "Que se passe-t-il si le réseau est indisponible lors d'un fetch ?", answers: ["fetch retourne null", "fetch retourne {error: true}", "La Promise est rejetée (catch/try-catch nécessaire)", "fetch retourne le cache navigateur"], correct: 2, explanation: "Une erreur réseau rejette la Promise. C'est le seul cas où fetch rejette automatiquement. Les erreurs HTTP (4xx, 5xx) ne rejettent PAS — response.ok sera false.", difficulty: 2 },
    ],
  },
  // ── JS Modules ───────────────────────────────────────────────────────────
  "js-modules": {
    theory: "Les modules ES6 permettent d'organiser le code en fichiers séparés. export permet d'exposer des fonctions, classes ou variables. import les importe dans d'autres fichiers. L'export default exporte une valeur principale par module. Les imports nommés ({}) importent des exports spécifiques. Dans le navigateur, les modules sont activés avec <script type='module'>. Les modules ont leur propre scope — pas de pollution de la variable globale.",
    questions: [
      { q: "Comment exporter une fonction nommée depuis un module ?", answers: ["module.export = function", "export function maFn() {}", "exports.maFn = function() {}", "public function maFn() {}"], correct: 1, explanation: "export devant une déclaration exporte une valeur nommée. Elle s'importe avec import { maFn } from './module.js'. L'export default est importé sans accolades.", difficulty: 1 },
      { q: "Quelle est la différence entre export default et export nommé ?", answers: ["Aucune différence", "default : un seul par module, importé sans accolades ; nommé : plusieurs, importés avec {}","default est pour les classes, nommé pour les fonctions", "default est CommonJS, nommé est ES6"], correct: 1, explanation: "Un module peut avoir un seul export default (import MonComp from './...'). Il peut avoir plusieurs exports nommés (import { fn1, fn2 } from './...').", difficulty: 2 },
      { q: "Comment importer tout un module sous un alias ?", answers: ["import './module' as M", "import * as M from './module.js'", "import { * } as M from './module.js'", "const M = require('./module.js')"], correct: 1, explanation: "import * as M importe tous les exports nommés dans un objet M. On accède ensuite à M.maFn(). Utile pour accéder à plusieurs exports sans les lister individuellement.", difficulty: 2 },
      { q: "Quelle balise script active les modules ES6 dans le navigateur ?", answers: ["<script module>", "<script type='module'>", "<script es6>", "<script import>"], correct: 1, explanation: "type='module' active les modules ES6 dans le navigateur. Les modules sont chargés de façon asynchrone, ont leur propre scope et n'exposent rien à window automatiquement.", difficulty: 1 },
      { q: "Que fait import('./module.js') avec des parenthèses ?", answers: ["Importe de façon synchrone", "Importe dynamiquement (retourne une Promise)", "Lance une erreur de syntaxe", "Importe uniquement l'export default"], correct: 1, explanation: "L'import dynamique charge un module à la demande — utile pour le code splitting et les imports conditionnels. Il retourne une Promise qui se résout avec le module.", difficulty: 2 },
    ],
  },
  // ── JS Functions ─────────────────────────────────────────────────────────
  "js-functions": {
    theory: "Les fonctions JavaScript sont des blocs de code réutilisables. Une fonction classique est déclarée avec 'function'. Les fonctions fléchées (arrow functions, =>) ont une syntaxe concise et n'ont pas leur propre 'this'. Le scope détermine où une variable est accessible. Une closure est une fonction qui capture les variables de son scope extérieur même après la fin de celui-ci. Les paramètres peuvent avoir des valeurs par défaut.",
    questions: [
      { q: "Quelle est la différence principale entre une fonction classique et une arrow function ?", answers: ["La vitesse d'exécution", "L'arrow function n'a pas son propre 'this'", "La longueur du code", "Le nombre de paramètres acceptés"], correct: 1, explanation: "Les arrow functions héritent du 'this' de leur contexte englobant. Les fonctions classiques ont leur propre 'this' qui dépend de comment elles sont appelées.", difficulty: 2 },
      { q: "Qu'est-ce qu'une closure en JavaScript ?", answers: ["Une fonction sans paramètres", "Une fonction qui capture les variables de son scope parent", "Un module fermé", "Une fonction auto-invoquée"], correct: 1, explanation: "Une closure mémorise les variables du scope où elle a été créée, même après la fin de ce scope. C'est la base des modules, callbacks, et patterns comme le currying.", difficulty: 2 },
      { q: "Que fait 'function hoisting' en JavaScript ?", answers: ["Les fonctions sont converties en classes", "Les déclarations de fonctions sont remontées en haut du scope", "Les fonctions sont exécutées automatiquement", "Les paramètres sont optionnels"], correct: 1, explanation: "Le hoisting remonte les déclarations de fonctions (function fn() {}) en haut du scope — on peut les appeler avant leur déclaration dans le code. Les arrow functions et expressions de fonctions ne sont pas hoistées.", difficulty: 2 },
      { q: "Comment définir un paramètre par défaut en JavaScript ?", answers: ["function f(x = default 5)", "function f(x || 5)", "function f(x = 5) {}", "function f(x: 5) {}"], correct: 2, explanation: "La syntaxe ES6 permet des valeurs par défaut : function f(x = 5, y = 'hello') {}. Si le paramètre est undefined ou omis, la valeur par défaut est utilisée.", difficulty: 1 },
      { q: "Qu'est-ce qu'une IIFE (Immediately Invoked Function Expression) ?", answers: ["Une fonction importée d'un module", "Une fonction qui s'exécute immédiatement après sa définition", "Une fonction asynchrone", "Une méthode de classe"], correct: 1, explanation: "Une IIFE est une fonction définie et exécutée immédiatement : (function() { ... })(); Utile pour créer un scope isolé et éviter la pollution des variables globales.", difficulty: 2 },
    ],
  },
  // ── React Hooks ──────────────────────────────────────────────────────────
  "react-hooks": {
    theory: "Les hooks React permettent d'utiliser l'état et d'autres fonctionnalités dans les composants fonctionnels. useState gère l'état local. useEffect exécute des effets de bord. useCallback mémoïse une fonction pour éviter sa re-création à chaque rendu. useMemo mémoïse une valeur calculée. useRef crée une référence mutable. useContext accède à un contexte React. La règle d'or : appeler les hooks uniquement au niveau supérieur du composant.",
    questions: [
      { q: "Que fait useCallback(fn, [deps]) ?", answers: ["Appelle la fonction fn immédiatement", "Mémoïse fn et la recrée seulement si les dépendances changent", "Crée une copie de fn", "Annule fn à chaque rendu"], correct: 1, explanation: "useCallback retourne la même instance de fn entre les rendus si les dépendances ne changent pas. Utile pour éviter de déclencher des re-rendus inutiles dans les composants enfants qui reçoivent cette fonction en prop.", difficulty: 2 },
      { q: "À quoi sert useMemo ?", answers: ["Mémoriser la dernière valeur de state", "Mémoïser une valeur calculée coûteuse", "Remplacer useState", "Faire des requêtes API"], correct: 1, explanation: "useMemo(fn, [deps]) ne recalcule la valeur que si les dépendances changent. Utile pour des calculs lourds (tri, filtrage d'une grande liste) qui ne doivent pas s'exécuter à chaque rendu.", difficulty: 2 },
      { q: "Quelle est la règle principale des hooks React ?", answers: ["Un seul hook par composant", "Appeler uniquement au niveau supérieur, jamais dans des if/boucles", "Toujours les retourner", "Les nommer en majuscules"], correct: 1, explanation: "Les hooks doivent être appelés dans le même ordre à chaque rendu. Les mettre dans des conditions ou boucles brise cet ordre et crée des bugs.", difficulty: 1 },
      { q: "Que retourne useRef(null) ?", answers: ["null", "Un objet {current: null} mutable", "Une Promise", "Un state initialisé à null"], correct: 1, explanation: "useRef retourne {current: valeur}. Modifier .current ne déclenche pas de re-rendu. Parfait pour référencer un élément DOM (ref={monRef}) ou stocker une valeur persistante.", difficulty: 1 },
      { q: "Comment partager de l'état entre composants sans prop drilling ?", answers: ["useState dans chaque composant", "useContext avec un Provider", "useEffect avec un listener global", "useRef partagé"], correct: 1, explanation: "useContext consomme un Context créé avec React.createContext(). Un Provider enveloppe les composants qui doivent accéder aux données. Évite de passer les props à travers toute la hiérarchie.", difficulty: 2 },
    ],
  },
  // ── React State ──────────────────────────────────────────────────────────
  "react-state": {
    theory: "L'état React (state) est la mémoire d'un composant. useState retourne [valeur, setter]. Quand le setter est appelé, React re-rend le composant. Ne jamais muter l'état directement — toujours créer un nouvel objet/tableau. Les props sont des données passées par le parent (en lecture seule). Le state lifting monte l'état vers l'ancêtre commun des composants qui en ont besoin. Pour un état global complexe, useReducer ou des librairies comme Zustand/Redux sont recommandées.",
    questions: [
      { q: "Comment mettre à jour un tableau dans le state React ?", answers: ["state.push(item)", "setState([...state, item])", "state[index] = item; setState(state)", "setState.add(item)"], correct: 1, explanation: "Il faut créer un NOUVEAU tableau. Le spread [...state, item] crée une copie avec le nouvel élément. Muter directement (push) ne déclenche pas de re-rendu car React compare les références.", difficulty: 1 },
      { q: "Qu'est-ce que le 'state lifting' ?", answers: ["Remonter l'état dans le localStorage", "Déplacer l'état vers l'ancêtre commun des composants qui en ont besoin", "Utiliser Redux pour gérer l'état", "Synchroniser l'état avec le serveur"], correct: 1, explanation: "Quand deux composants frères partagent un état, on le remonte dans leur parent commun. Le parent gère l'état et le passe via props. C'est le pattern fondamental de React.", difficulty: 2 },
      { q: "Pourquoi ne faut-il pas muter directement le state ?", answers: ["C'est interdit par la syntaxe JS", "React détecte les changements par référence — une mutation ne déclenche pas de re-rendu", "Ça ralentit l'application", "Les mutations créent des erreurs de type"], correct: 1, explanation: "React compare l'ancienne et la nouvelle valeur du state par référence (===). Si on mute le même objet, la référence ne change pas et React ne voit pas de changement.", difficulty: 2 },
      { q: "Qu'est-ce que useReducer et quand l'utiliser ?", answers: ["Une alternative à fetch", "Pour gérer un état complexe avec plusieurs actions via une fonction reducer", "Pour remplacer useEffect", "Pour créer des animations"], correct: 1, explanation: "useReducer(reducer, initialState) est préférable à useState quand l'état est complexe ou que plusieurs actions le modifient. Le reducer est une fonction pure (state, action) => newState.", difficulty: 2 },
      { q: "Comment éviter des re-rendus inutiles d'un composant enfant ?", answers: ["Utiliser useState dans l'enfant", "Envelopper l'enfant dans React.memo()", "Passer des props undefined", "Utiliser useEffect dans le parent"], correct: 1, explanation: "React.memo() mémoïse le composant : il ne se re-rend que si ses props changent (comparaison superficielle). Combiner avec useCallback pour les fonctions passées en props.", difficulty: 2 },
    ],
  },
  // ── Vue.js ───────────────────────────────────────────────────────────────
  vuejs: {
    theory: "Vue.js est un framework JavaScript progressif pour créer des interfaces. La Composition API (Vue 3) utilise setup(), ref() et reactive() pour gérer l'état. v-bind lie des attributs dynamiquement (:class, :href). v-on écoute les événements (@click). v-model crée une liaison bidirectionnelle sur les inputs. v-if/v-else conditionne l'affichage. v-for itère sur des tableaux.",
    questions: [
      { q: "Que fait v-model sur un input en Vue ?", answers: ["Valide le champ", "Crée une liaison de données bidirectionnelle", "Désactive le champ", "Applique un style"], correct: 1, explanation: "v-model synchronise la valeur de l'input avec une variable réactive. C'est un raccourci pour :value + @input. En React, cela correspond à value + onChange.", difficulty: 1 },
      { q: "Comment créer une variable réactive en Vue 3 (Composition API) ?", answers: ["let x = reactive()", "const x = ref(0)", "useState(0)", "reactive x = 0"], correct: 1, explanation: "ref(valeur) crée une valeur réactive. On y accède avec .value dans le script (x.value) mais directement dans le template ({{ x }}). reactive() est pour les objets.", difficulty: 1 },
      { q: "Que fait la directive v-if ?", answers: ["Itère sur un tableau", "Lie un événement", "Conditionne le rendu d'un élément (ajoute/supprime du DOM)", "Lie un attribut"], correct: 2, explanation: "v-if ajoute ou supprime vraiment l'élément du DOM. v-show le garde mais le cache avec display:none. v-if a un coût plus élevé si l'état change souvent.", difficulty: 1 },
      { q: "Comment itérer sur une liste en Vue ?", answers: ["<div loop='item in items'>", "<div v-for='item in items' :key='item.id'>", "<for item in items>", "<div v-each='item in items'>"], correct: 1, explanation: "v-for itère sur un tableau. :key est obligatoire pour l'optimisation de Vue. On peut aussi itérer sur des objets : v-for='(value, key) in objet'.", difficulty: 1 },
      { q: "Qu'est-ce qu'une 'computed property' en Vue ?", answers: ["Une propriété CSS calculée", "Une valeur dérivée mise en cache, recalculée seulement si ses dépendances changent", "Un événement automatique", "Une prop calculée par le parent"], correct: 1, explanation: "computed() en Vue 3 calcule une valeur à partir d'autres données réactives. Elle est mise en cache — pas recalculée si les dépendances n'ont pas changé. Équivalent à useMemo en React.", difficulty: 2 },
    ],
  },
  // ── TypeScript ───────────────────────────────────────────────────────────
  typescript: {
    theory: "TypeScript est un sur-ensemble de JavaScript qui ajoute le typage statique. Les types détectent les erreurs à la compilation plutôt qu'à l'exécution. interface définit la forme d'un objet. type crée des alias de types. Les génériques <T> rendent le code réutilisable avec n'importe quel type. Le compilateur tsc transpile TypeScript en JavaScript. TypeScript est particulièrement utile en équipe et dans les grandes bases de code.",
    questions: [
      { q: "Comment déclarer une variable typée en TypeScript ?", answers: ["let x = number", "let x: number = 5", "number x = 5", "let x as number = 5"], correct: 1, explanation: "Les deux-points (:) annotent le type : let x: number = 5. TypeScript peut aussi inférer le type automatiquement : let x = 5 (TypeScript sait que x est un number).", difficulty: 1 },
      { q: "Quelle est la différence entre 'interface' et 'type' en TypeScript ?", answers: ["Aucune", "interface s'étend (extends), type peut représenter des unions et intersections", "type est plus récent", "interface est pour les classes uniquement"], correct: 1, explanation: "Les deux définissent des types d'objets. interface est extensible (extends). type peut représenter des unions (A | B), intersections (A & B) et types primitifs. En pratique, les deux fonctionnent souvent de façon interchangeable.", difficulty: 2 },
      { q: "Que signifie 'any' en TypeScript ?", answers: ["Un type pour les tableaux", "Désactive le typage — à éviter autant que possible", "Un type pour les objets vides", "Un type générique"], correct: 1, explanation: "any désactive complètement la vérification de type. C'est utile pour la migration de JS vers TS, mais l'utiliser trop souvent annule les bénéfices de TypeScript. Préférer unknown pour les valeurs inconnues.", difficulty: 1 },
      { q: "Que font les génériques <T> en TypeScript ?", answers: ["Créent une classe générique", "Permettent d'écrire du code réutilisable avec n'importe quel type", "Définissent un type optionnel", "Représentent une valeur null"], correct: 1, explanation: "Les génériques permettent d'écrire une fonction ou une interface qui fonctionne avec différents types : function identity<T>(arg: T): T. T est remplacé par le type réel lors de l'utilisation.", difficulty: 2 },
      { q: "Comment rendre une propriété optionnelle dans une interface TypeScript ?", answers: ["property?: type", "optional property: type", "property: type | undefined", "?property: type"], correct: 0, explanation: "Le point d'interrogation (?) marque une propriété comme optionnelle : interface User { nom: string; age?: number }. age peut être absent ou undefined.", difficulty: 1 },
    ],
  },
  // ── SQL Joins ────────────────────────────────────────────────────────────
  "sql-joins": {
    theory: "Les jointures SQL combinent des lignes de plusieurs tables selon une condition. INNER JOIN retourne les lignes avec correspondance dans les deux tables. LEFT JOIN garde toutes les lignes de la table gauche, avec NULL pour les colonnes de droite si pas de correspondance. RIGHT JOIN fait l'inverse. FULL OUTER JOIN combine les deux. Les jointures se font généralement sur des clés (PRIMARY KEY et FOREIGN KEY).",
    questions: [
      { q: "Que retourne INNER JOIN ?", answers: ["Toutes les lignes des deux tables", "Seulement les lignes avec correspondance dans les deux tables", "Toutes les lignes de la table gauche", "Une seule ligne par table"], correct: 1, explanation: "INNER JOIN est l'intersection : il ne retourne que les lignes où la condition de jointure est vraie dans les DEUX tables. Les lignes sans correspondance sont exclues.", difficulty: 1 },
      { q: "Quelle jointure garde toutes les lignes de la table gauche ?", answers: ["INNER JOIN", "FULL OUTER JOIN", "LEFT JOIN", "RIGHT JOIN"], correct: 2, explanation: "LEFT JOIN (ou LEFT OUTER JOIN) garde toutes les lignes de la table gauche. Si une ligne n'a pas de correspondance à droite, les colonnes de droite valent NULL.", difficulty: 1 },
      { q: "Comment écrire une jointure entre 'commandes' et 'clients' ?", answers: ["JOIN commandes ON clients", "SELECT * FROM commandes INNER JOIN clients ON commandes.client_id = clients.id", "SELECT * FROM commandes, clients WHERE client_id", "MERGE commandes WITH clients ON id"], correct: 1, explanation: "La syntaxe INNER JOIN spécifie la table et la condition ON. On lie la clé étrangère (client_id) à la clé primaire (id) de l'autre table.", difficulty: 1 },
      { q: "Que vaut une colonne de la table droite dans un LEFT JOIN sans correspondance ?", answers: ["0", "''", "NULL", "Erreur"], correct: 2, explanation: "Sans correspondance, les colonnes de la table de droite valent NULL dans un LEFT JOIN. On peut filtrer ces lignes avec WHERE table_droite.col IS NULL pour trouver les éléments sans correspondance.", difficulty: 2 },
      { q: "Peut-on joindre plus de deux tables en SQL ?", answers: ["Non, maximum 2 tables", "Oui, en chaînant plusieurs JOIN", "Oui, mais seulement avec UNION", "Oui, uniquement avec des sous-requêtes"], correct: 1, explanation: "On peut chaîner autant de JOIN que nécessaire : FROM a JOIN b ON ... JOIN c ON ... JOIN d ON ... Chaque JOIN ajoute une table au résultat.", difficulty: 2 },
    ],
  },
  // ── SQL Aggregations ─────────────────────────────────────────────────────
  "sql-aggregations": {
    theory: "Les fonctions d'agrégation SQL calculent des valeurs sur un ensemble de lignes. COUNT() compte les lignes, SUM() additionne, AVG() calcule la moyenne, MIN()/MAX() trouvent les extrêmes. GROUP BY regroupe les lignes par valeur commune avant d'appliquer les agrégations. HAVING filtre les groupes (comme WHERE mais après agrégation). Ces outils permettent des analyses statistiques directement en SQL.",
    questions: [
      { q: "Que fait GROUP BY dans une requête SQL ?", answers: ["Trie les résultats", "Regroupe les lignes par valeur identique pour les fonctions d'agrégation", "Filtre les lignes", "Joint deux tables"], correct: 1, explanation: "GROUP BY regroupe les lignes qui ont la même valeur dans une colonne. On l'utilise avec COUNT, SUM, AVG pour calculer des statistiques par groupe.", difficulty: 1 },
      { q: "Quelle différence entre WHERE et HAVING ?", answers: ["Aucune", "WHERE filtre avant GROUP BY, HAVING filtre après", "HAVING est plus rapide", "WHERE s'utilise avec JOIN, HAVING sans"], correct: 1, explanation: "WHERE filtre les lignes individuelles AVANT le regroupement. HAVING filtre les groupes APRÈS le GROUP BY. Ex: HAVING COUNT(*) > 5 garde seulement les groupes de plus de 5 éléments.", difficulty: 2 },
      { q: "Comment compter le nombre de commandes par client ?", answers: ["SELECT client_id, COUNT(id) FROM commandes GROUP BY client_id", "SELECT COUNT(*) FROM commandes WHERE client_id", "SELECT client_id, SUM(1) FROM commandes", "SELECT COUNT(client_id) FROM commandes"], correct: 0, explanation: "GROUP BY client_id crée un groupe par client. COUNT(id) ou COUNT(*) compte les lignes dans chaque groupe. Le résultat : une ligne par client avec son nombre de commandes.", difficulty: 2 },
      { q: "Que retourne AVG(salaire) ?", answers: ["Le salaire le plus fréquent", "La somme des salaires", "La moyenne des salaires", "Le salaire médian"], correct: 2, explanation: "AVG() calcule la moyenne arithmétique. Elle ignore les valeurs NULL. Pour inclure les NULL comme 0, utiliser AVG(COALESCE(salaire, 0)).", difficulty: 1 },
      { q: "Comment trouver les clients ayant passé plus de 3 commandes ?", answers: ["WHERE COUNT(commandes) > 3", "HAVING commandes > 3", "SELECT client_id FROM commandes GROUP BY client_id HAVING COUNT(*) > 3", "SELECT client_id WHERE commandes.count > 3"], correct: 2, explanation: "GROUP BY client_id regroupe par client. COUNT(*) compte les commandes de chaque groupe. HAVING COUNT(*) > 3 filtre pour ne garder que ceux qui ont plus de 3 commandes.", difficulty: 2 },
    ],
  },
  // ── Git Advanced ─────────────────────────────────────────────────────────
  "git-advanced": {
    theory: "Les opérations Git avancées permettent de gérer l'historique et les conflits. git rebase réapplique des commits sur une autre base — préférable à merge pour un historique linéaire. git cherry-pick applique un commit spécifique sur la branche courante. git bisect trouve le commit qui a introduit un bug par dichotomie. Les conflits surviennent quand deux branches modifient la même zone du code et doivent être résolus manuellement.",
    questions: [
      { q: "Quelle est la différence entre git merge et git rebase ?", answers: ["merge est plus récent", "merge crée un commit de fusion, rebase réapplique les commits un par un pour un historique linéaire", "rebase supprime les branches", "merge ne fonctionne que sur main"], correct: 1, explanation: "merge préserve l'historique des deux branches (commit de merge). rebase réécrit l'historique pour qu'il soit linéaire — plus propre mais ne doit pas être utilisé sur des branches partagées.", difficulty: 2 },
      { q: "Que fait git cherry-pick abc123 ?", answers: ["Annule le commit abc123", "Applique les changements du commit abc123 sur la branche courante", "Fusionne abc123 dans main", "Affiche le détail du commit abc123"], correct: 1, explanation: "cherry-pick applique les changements d'un commit spécifique (identifié par son hash) sur la branche courante, sans fusionner toute la branche source.", difficulty: 2 },
      { q: "Comment annuler le dernier commit en conservant les modifications ?", answers: ["git revert HEAD", "git reset HEAD~1", "git undo", "git checkout HEAD~1"], correct: 1, explanation: "git reset HEAD~1 (soft par défaut) annule le commit mais conserve les modifications dans le working directory. --hard les supprime aussi. Attention : ne pas utiliser sur des commits déjà poussés.", difficulty: 2 },
      { q: "Qu'est-ce qu'un conflit Git et comment le résoudre ?", answers: ["Une erreur de réseau", "Deux branches modifient le même code — résoudre en éditant le fichier et en faisant git add", "Un bug dans Git", "Une branche corrompue"], correct: 1, explanation: "Un conflit survient quand deux branches modifient la même zone. Git marque les conflits dans le fichier avec <<<, ===, >>>. On édite manuellement, on choisit le code à garder, puis git add + git commit.", difficulty: 1 },
      { q: "Comment voir quels commits diffèrent entre deux branches ?", answers: ["git status --branches", "git log branche1..branche2", "git diff --commits", "git compare branche1 branche2"], correct: 1, explanation: "git log branche1..branche2 montre les commits dans branche2 mais pas dans branche1. git log --oneline --graph --all visualise toutes les branches.", difficulty: 2 },
    ],
  },
  // ── Linux ────────────────────────────────────────────────────────────────
  linux: {
    theory: "Linux est le système d'exploitation dominant des serveurs. Les commandes essentielles : ls (lister), cd (changer répertoire), mkdir (créer dossier), rm (supprimer), cp (copier), mv (déplacer/renommer), cat (afficher fichier), grep (chercher), chmod (permissions). Les permissions rwx (read, write, execute) s'appliquent à l'utilisateur, le groupe et les autres. Le pipe (|) enchaîne des commandes.",
    questions: [
      { q: "Que fait la commande 'ls -la' ?", answers: ["Supprime tous les fichiers", "Liste tous les fichiers dont les cachés, avec permissions et taille", "Lance une application", "Lie des fichiers"], correct: 1, explanation: "-l affiche le format long (permissions, propriétaire, taille). -a affiche les fichiers cachés (commençant par .). ls -lh ajoute des tailles lisibles (K, M, G).", difficulty: 1 },
      { q: "Que signifie 'chmod 755 script.sh' ?", answers: ["Supprime le fichier", "Donne rwx au propriétaire, r-x au groupe et aux autres", "Change le propriétaire", "Crée un lien symbolique"], correct: 1, explanation: "755 en octal : 7=rwx (propriétaire), 5=r-x (groupe), 5=r-x (autres). chmod +x script.sh ajoute le droit d'exécution à tous. Indispensable pour exécuter un script.", difficulty: 2 },
      { q: "Comment chercher 'erreur' dans tous les fichiers .log ?", answers: ["find 'erreur' *.log", "grep 'erreur' *.log", "search erreur *.log", "cat *.log | find 'erreur'"], correct: 1, explanation: "grep cherche un motif dans des fichiers. grep -r cherche récursivement dans les dossiers. grep -i ignore la casse. grep -n affiche les numéros de lignes.", difficulty: 1 },
      { q: "Que fait le pipe '|' dans 'ps aux | grep node' ?", answers: ["Redirige la sortie vers un fichier", "Passe la sortie de ps aux comme entrée de grep node", "Lance les deux commandes en parallèle", "Combine les résultats des deux commandes"], correct: 1, explanation: "Le pipe passe la sortie stdout d'une commande vers l'entrée stdin de la suivante. ps aux liste tous les processus, grep node filtre ceux contenant 'node'.", difficulty: 1 },
      { q: "Comment se connecter à un serveur distant en SSH ?", answers: ["ssh user@serveur", "connect user@serveur", "remote user@serveur", "telnet user@serveur"], correct: 0, explanation: "ssh user@ip ou ssh user@nom-domaine ouvre une session sécurisée. ssh -i cle.pem user@ip utilise une clé privée. Les clés SSH sont préférées aux mots de passe.", difficulty: 1 },
    ],
  },
  // ── Bash ─────────────────────────────────────────────────────────────────
  bash: {
    theory: "Bash est le shell et langage de scripting standard sur Linux/macOS. Un script commence par #!/bin/bash (shebang). Les variables se déclarent sans espaces : VAR=valeur. On les lit avec $VAR. Les conditions : if [ condition ]; then ... fi. Les boucles : for item in liste; do ... done. Les fonctions se déclarent avec function nom() {}. Les scripts automatisent des tâches répétitives.",
    questions: [
      { q: "Comment déclarer et lire une variable en Bash ?", answers: ["var x = 5; echo x", "x=5; echo $x", "set x 5; print $x", "let x = 5; echo {x}"], correct: 1, explanation: "x=5 sans espaces assigne la valeur. $x ou ${x} lit la variable. Les espaces autour de = créent une erreur. Les guillemets doubles permettent l'interpolation : \"Bonjour $x\".", difficulty: 1 },
      { q: "Comment rendre un script Bash exécutable ?", answers: ["bash --executable script.sh", "chmod +x script.sh", "exec script.sh", "set -x script.sh"], correct: 1, explanation: "chmod +x ajoute le droit d'exécution. On lance ensuite le script avec ./script.sh (ou bash script.sh sans le droit d'exécution).", difficulty: 1 },
      { q: "Que fait 'if [ $VAR -eq 5 ]; then echo oui; fi' ?", answers: ["Affiche 'oui' si VAR est la chaîne '5'", "Affiche 'oui' si VAR vaut 5 numériquement", "Affiche toujours 'oui'", "Erreur de syntaxe"], correct: 1, explanation: "-eq compare des entiers (equal). Pour les chaînes : = ou ==. Les opérateurs numériques : -eq, -ne, -lt, -gt, -le, -ge. Pour les chaînes : =, !=, -z (vide), -n (non vide).", difficulty: 2 },
      { q: "Comment boucler sur des fichiers .txt dans un dossier ?", answers: ["foreach f in *.txt do echo $f done", "for f in *.txt; do echo $f; done", "loop f *.txt { echo $f }", "while *.txt; do echo $f; done"], correct: 1, explanation: "for f in *.txt; do ... done itère sur tous les fichiers .txt. for i in {1..10}; do ... done itère de 1 à 10. while true; do ... done crée une boucle infinie.", difficulty: 1 },
      { q: "Que fait '$?' en Bash ?", answers: ["Le PID du script", "Le code de retour de la dernière commande (0=succès, autre=erreur)", "Le chemin du script", "Le nombre d'arguments"], correct: 1, explanation: "$? contient le code de sortie de la dernière commande. 0 signifie succès. Toute autre valeur indique une erreur. Utile pour vérifier si une commande a réussi.", difficulty: 2 },
    ],
  },
  // ── Node.js Modules ──────────────────────────────────────────────────────
  "nodejs-modules": {
    theory: "Node.js utilise des modules pour organiser le code. CommonJS (syntaxe traditionnelle Node) : require('module') pour importer, module.exports pour exporter. ES Modules (moderne) : import/export, nécessite type:'module' dans package.json. Modules built-in importants : fs (fichiers), path (chemins), http (serveur), os (système). Les dépendances npm sont stockées dans node_modules.",
    questions: [
      { q: "Comment importer le module 'fs' en CommonJS ?", answers: ["import fs from 'fs'", "const fs = require('fs')", "include('fs')", "using fs = 'fs'"], correct: 1, explanation: "require() est la syntaxe CommonJS de Node.js.", difficulty: 1 },
      { q: "Comment exporter une fonction 'calculer' en CommonJS ?", answers: ["export function calculer(){}", "module.exports = { calculer }", "exports default calculer", "module.export(calculer)"], correct: 1, explanation: "module.exports = {...} définit ce qui sera accessible via require().", difficulty: 2 },
      { q: "Que contient node_modules et doit-on le commiter ?", answers: ["Code source, oui", "Dépendances npm installées, NON (dans .gitignore)", "Fichiers de config, oui", "Logs, non"], correct: 1, explanation: "node_modules est lourd et reconstruit via npm install. Toujours dans .gitignore.", difficulty: 1 },
    ],
  },
  // ── MongoDB ───────────────────────────────────────────────────────────────
  mongodb: {
    theory: "MongoDB est une base de données NoSQL orientée documents. Les données sont stockées en documents BSON (similaire JSON) dans des collections. Pas de schéma fixe. Opérations CRUD : find(), insertOne(), updateOne(), deleteOne(). Les filtres utilisent des opérateurs : { age: { $gt: 18 } }. L'index améliore les performances.",
    questions: [
      { q: "Quelle est la différence principale entre MongoDB et SQL ?", answers: ["MongoDB est plus rapide pour tout", "MongoDB stocke des documents JSON flexibles sans schéma fixe, SQL utilise des tables avec schéma rigide", "MongoDB ne supporte pas les relations", "SQL est obsolète"], correct: 1, explanation: "MongoDB = NoSQL document-oriented. Schéma flexible. SQL = relationnel, schéma strict.", difficulty: 1 },
      { q: "Comment filtrer les documents où l'âge est supérieur à 18 ?", answers: ["{ age > 18 }", "{ age: { $gt: 18 } }", "WHERE age > 18", "{ age: 'gt(18)' }"], correct: 1, explanation: "MongoDB utilise des opérateurs : $gt (>), $gte (>=), $lt (<), $lte (<=), $eq, $ne.", difficulty: 2 },
      { q: "Quelle méthode met à jour un champ sans remplacer tout le document ?", answers: ["updateOne({filter}, newDoc)", "updateOne({filter}, { $set: { champ: valeur } })", "replaceOne({filter}, { champ: valeur })", "patchOne({filter}, { champ: valeur })"], correct: 1, explanation: "$set modifie seulement les champs spécifiés. Sans $set, le document entier serait remplacé.", difficulty: 2 },
    ],
  },
  // ── Redis ─────────────────────────────────────────────────────────────────
  redis: {
    theory: "Redis est une base de données en mémoire ultra-rapide, utilisée comme cache et store de sessions. Structures : String (SET/GET), List, Hash, Set, Sorted Set. TTL : SET key value EX 3600 expire après 1 heure. Redis est idéal pour cacher des requêtes SQL coûteuses et stocker les sessions.",
    questions: [
      { q: "Quel est le cas d'usage principal de Redis ?", answers: ["Stockage principal de données", "Cache en mémoire pour accélérer l'accès aux données", "Base de données relationnelle", "Stockage de fichiers"], correct: 1, explanation: "Redis stocke en RAM, rendant les lectures/écritures extrêmement rapides.", difficulty: 1 },
      { q: "Comment définir une clé Redis qui expire après 60 secondes ?", answers: ["SET key value TTL 60", "SET key value EX 60", "SET key value EXPIRE 60", "SET key value TIMEOUT 60"], correct: 1, explanation: "EX N définit le TTL en secondes. EXPIRE key N peut aussi le définir après coup.", difficulty: 2 },
      { q: "Quelle commande récupère la valeur d'une clé Redis ?", answers: ["FETCH key", "READ key", "GET key", "RETRIEVE key"], correct: 2, explanation: "GET key retourne la valeur. SET key value la définit. DEL key la supprime.", difficulty: 1 },
    ],
  },
  // ── GraphQL ───────────────────────────────────────────────────────────────
  graphql: {
    theory: "GraphQL expose un seul endpoint et le client demande exactement les données dont il a besoin. Le schéma définit les types et opérations : Query (lecture), Mutation (écriture), Subscription (temps réel). Les resolvers implémentent comment récupérer chaque champ. GraphQL évite le sur-fetch et le sous-fetch.",
    questions: [
      { q: "Quelle est la principale différence entre GraphQL et REST ?", answers: ["GraphQL est plus rapide", "GraphQL permet de demander exactement les champs voulus via un seul endpoint", "REST supporte plus de formats", "GraphQL ne supporte que le JSON"], correct: 1, explanation: "Avec REST, le serveur décide. Avec GraphQL, le client spécifie — moins de données transférées.", difficulty: 1 },
      { q: "Quelles sont les 3 opérations principales en GraphQL ?", answers: ["GET, POST, DELETE", "Query, Mutation, Subscription", "Read, Write, Watch", "Select, Insert, Update"], correct: 1, explanation: "Query = lecture, Mutation = écriture, Subscription = écoute temps réel (WebSocket).", difficulty: 2 },
      { q: "Qu'est-ce qu'un resolver en GraphQL ?", answers: ["Un middleware de validation", "La fonction qui récupère les données pour un champ du schéma", "Un type de variable", "Un outil de test"], correct: 1, explanation: "Chaque champ a un resolver. Il définit comment obtenir la donnée : BDD, API externe, calcul.", difficulty: 2 },
    ],
  },
  // ── WebSockets ────────────────────────────────────────────────────────────
  websockets: {
    theory: "WebSocket est un protocole bidirectionnel persistant. Contrairement à HTTP, WebSocket maintient une connexion ouverte. Côté client : const ws = new WebSocket('ws://...'); ws.send(data); ws.onmessage = e => ... Cas d'usage : chats, jeux multijoueur, tableaux de bord temps réel.",
    questions: [
      { q: "Quelle est la différence entre HTTP et WebSocket ?", answers: ["HTTP est plus récent", "HTTP est requête-réponse, WebSocket maintient une connexion bidirectionnelle persistante", "WebSocket ne peut envoyer que du texte", "HTTP est plus rapide pour le temps réel"], correct: 1, explanation: "WebSocket : connexion ouverte, le serveur peut envoyer sans que le client demande.", difficulty: 1 },
      { q: "Quel protocole WebSocket utilise-t-on pour une connexion sécurisée ?", answers: ["ws://", "wss://", "https-ws://", "secure-ws://"], correct: 1, explanation: "wss:// est WebSocket over TLS, équivalent à HTTPS.", difficulty: 2 },
      { q: "Quelle bibliothèque Node.js facilite WebSocket avec des fonctionnalités comme les rooms ?", answers: ["ws", "socket.io", "express-ws", "node-websocket"], correct: 1, explanation: "Socket.io ajoute : rooms, namespaces, reconnexion automatique, fallback polling.", difficulty: 2 },
    ],
  },
  // ── GitHub Actions ────────────────────────────────────────────────────────
  "github-actions": {
    theory: "GitHub Actions automatise les workflows CI/CD. Un workflow est défini dans .github/workflows/nom.yml. Il se déclenche sur des événements : push, pull_request, schedule. Un workflow contient des jobs avec des steps. Les secrets sont stockés dans les paramètres du repo : ${{ secrets.MA_CLE }}.",
    questions: [
      { q: "Où se place le fichier d'un workflow GitHub Actions ?", answers: [".github/ci.yml", ".github/workflows/nom.yml", "github-actions.yml", "ci/workflow.yml"], correct: 1, explanation: "GitHub Actions détecte les fichiers YAML dans .github/workflows/.", difficulty: 1 },
      { q: "Comment utiliser un secret GitHub dans un workflow ?", answers: ["$SECRET.MON_TOKEN", "${{ secrets.MON_TOKEN }}", "env.MON_TOKEN", "github.secret.MON_TOKEN"], correct: 1, explanation: "${{ secrets.NOM }} accède aux secrets. Ils ne s'affichent jamais dans les logs.", difficulty: 2 },
      { q: "Quelle action GitHub est typiquement la première étape ?", answers: ["actions/setup-node", "actions/checkout@v4", "actions/install", "actions/build"], correct: 1, explanation: "actions/checkout clone le code du repo dans l'environnement du runner.", difficulty: 1 },
    ],
  },
  // ── Kubernetes ────────────────────────────────────────────────────────────
  kubernetes: {
    theory: "Kubernetes (K8s) orchestre des conteneurs à grande échelle. Les Pods sont la plus petite unité déployable. Un Deployment gère le nombre de réplicas et les mises à jour progressives. Un Service expose les Pods sur le réseau. kubectl est l'outil CLI pour interagir avec K8s.",
    questions: [
      { q: "Qu'est-ce qu'un Pod dans Kubernetes ?", answers: ["Un serveur physique", "La plus petite unité déployable contenant un ou plusieurs conteneurs", "Un cluster K8s complet", "Un service réseau"], correct: 1, explanation: "Un Pod partage réseau et stockage entre ses conteneurs.", difficulty: 1 },
      { q: "Quel objet K8s garantit un nombre de réplicas toujours actif ?", answers: ["Service", "Pod", "Deployment", "Node"], correct: 2, explanation: "Un Deployment maintient N réplicas. Si un Pod crashe, il en recrée un.", difficulty: 2 },
      { q: "Quelle commande liste tous les Pods ?", answers: ["kubectl show pods", "kubectl get pods", "kubectl list pods", "kubectl ps"], correct: 1, explanation: "kubectl get pods liste les Pods du namespace courant.", difficulty: 1 },
    ],
  },
  // ── AWS ───────────────────────────────────────────────────────────────────
  aws: {
    theory: "AWS est le principal fournisseur de cloud. Services essentiels : EC2 (machines virtuelles), S3 (stockage d'objets), RDS (bases de données managées), Lambda (serverless), CloudFront (CDN), Route 53 (DNS). Le modèle de tarification est 'pay-as-you-go'.",
    questions: [
      { q: "Quel service AWS héberge des machines virtuelles ?", answers: ["S3", "Lambda", "EC2", "RDS"], correct: 2, explanation: "EC2 (Elastic Compute Cloud) fournit des instances de VM.", difficulty: 1 },
      { q: "Quel service AWS stocke des fichiers statiques ?", answers: ["EBS", "EC2", "S3", "RDS"], correct: 2, explanation: "S3 (Simple Storage Service) stocke des objets. Utilisé pour les assets, backups, logs.", difficulty: 1 },
      { q: "Qu'est-ce qu'une fonction Lambda AWS ?", answers: ["Un serveur EC2 léger", "Code sans serveur (serverless), facturé à l'exécution", "Un service de BDD", "Un proxy réseau"], correct: 1, explanation: "Lambda = serverless. AWS exécute et facture le temps d'exécution. Auto-scaling automatique.", difficulty: 2 },
    ],
  },
  // ── ML Concepts ───────────────────────────────────────────────────────────
  "ml-concepts": {
    theory: "Le Machine Learning permet à des algorithmes d'apprendre à partir de données. Apprentissage supervisé : données labellisées (X → Y). Non-supervisé : trouver des structures sans labels (clustering). Par renforcement : apprendre par récompenses. L'overfitting survient quand le modèle mémorise au lieu de généraliser.",
    questions: [
      { q: "Qu'est-ce que l'apprentissage supervisé ?", answers: ["Un humain supervise chaque prédiction", "Entraîner sur des paires (entrée, sortie) connues", "Apprendre par essai-erreur", "Trouver des patterns sans labels"], correct: 1, explanation: "Supervisé = données labellisées. Ex: classification spam/non-spam, prédire un prix.", difficulty: 1 },
      { q: "Qu'est-ce que l'overfitting ?", answers: ["Modèle qui apprend trop vite", "Modèle performant en train mais mal sur nouvelles données", "Manque de données", "Modèle trop simple"], correct: 1, explanation: "L'overfitting : le modèle mémorise le bruit. Remèdes : plus de données, régularisation, cross-validation.", difficulty: 2 },
      { q: "Pourquoi sépare-t-on les données en training et test set ?", answers: ["Pour aller plus vite", "Pour évaluer si le modèle généralise sur des données non vues", "Économiser la mémoire", "Les algorithmes l'exigent"], correct: 1, explanation: "Le test set simule des données réelles inconnues.", difficulty: 2 },
      { q: "Qu'est-ce qu'une feature en ML ?", answers: ["Une fonctionnalité logicielle", "Une variable d'entrée pour faire des prédictions", "Le résultat d'une prédiction", "Un hyperparamètre"], correct: 1, explanation: "Features = variables d'entrée. Label = valeur à prédire.", difficulty: 1 },
    ],
  },
  // ── Python Data ───────────────────────────────────────────────────────────
  "python-data": {
    theory: "Python est le langage principal de la data science. NumPy fournit les ndarray ultra-rapides. Pandas fournit DataFrame (tableau 2D) et Series (colonne). Matplotlib/Seaborn pour visualiser. Scikit-learn pour le ML. Jupyter Notebook permet l'exécution interactive.",
    questions: [
      { q: "Quelle bibliothèque Python fournit les tableaux numériques multidimensionnels ?", answers: ["Pandas", "NumPy", "Matplotlib", "Scipy"], correct: 1, explanation: "NumPy est la base de l'écosystème data. Les ndarray sont plus rapides que les listes Python.", difficulty: 1 },
      { q: "Quelle est la structure principale de Pandas ?", answers: ["Array", "Matrix", "DataFrame", "Table"], correct: 2, explanation: "Un DataFrame est un tableau 2D avec des colonnes nommées. Chaque colonne est une Series.", difficulty: 1 },
      { q: "Comment calculer la moyenne d'une colonne 'age' dans un DataFrame df ?", answers: ["df.average('age')", "df['age'].mean()", "mean(df.age)", "df.calc_mean('age')"], correct: 1, explanation: "df['age'].mean() retourne la moyenne. .median(), .std(), .describe() donnent d'autres statistiques.", difficulty: 2 },
    ],
  },
  // ── LLM ───────────────────────────────────────────────────────────────────
  llm: {
    theory: "Les LLMs (Large Language Models) prédisent le token suivant basé sur le contexte précédent. L'architecture Transformer est à la base de GPT, Claude, Gemini. Le pré-entraînement apprend le langage. Le fine-tuning adapte le modèle. Le RLHF aligne le comportement avec les préférences humaines.",
    questions: [
      { q: "Que prédit un LLM à chaque étape de génération ?", answers: ["La phrase suivante complète", "Le token (mot ou sous-mot) le plus probable", "La réponse finale directement", "La structure de la réponse"], correct: 1, explanation: "Les LLMs génèrent token par token selon une distribution de probabilités.", difficulty: 1 },
      { q: "Quelle architecture est à la base de tous les LLMs modernes ?", answers: ["CNN", "RNN", "Transformer (avec attention)", "SVM"], correct: 2, explanation: "Le Transformer (2017) utilise l'auto-attention pour capturer les relations entre tous les tokens.", difficulty: 2 },
      { q: "Qu'est-ce que le contexte (context window) d'un LLM ?", answers: ["La mémoire permanente", "La quantité maximale de texte que le modèle peut traiter en une fois", "La fenêtre d'interface", "Le nombre de paramètres"], correct: 1, explanation: "La context window limite combien de texte le modèle 'voit' simultanément.", difficulty: 2 },
    ],
  },
  // ── Prompt Engineering ────────────────────────────────────────────────────
  "prompt-eng": {
    theory: "Le prompt engineering guide les LLMs efficacement. Techniques : être spécifique, donner du contexte, spécifier le format de sortie, utiliser des exemples (few-shot), utiliser la chaîne de pensée (chain-of-thought). Temperature contrôle la créativité (0 = déterministe, 1 = créatif).",
    questions: [
      { q: "Qu'est-ce que le few-shot prompting ?", answers: ["Plusieurs essais", "Fournir des exemples d'entrée/sortie dans le prompt", "Utiliser plusieurs modèles", "Réduire la longueur du prompt"], correct: 1, explanation: "Few-shot : montrer 2-5 exemples. Le modèle comprend le pattern et l'applique.", difficulty: 1 },
      { q: "Que fait la technique 'Chain of Thought' ?", answers: ["Enchaîner plusieurs modèles", "Demander de raisonner étape par étape pour améliorer la précision", "Chaîner des prompts automatiquement", "Utiliser l'historique de conversation"], correct: 1, explanation: "'Pense étape par étape' améliore significativement les raisonnements complexes.", difficulty: 2 },
      { q: "Que contrôle le paramètre temperature ?", answers: ["La vitesse de génération", "Le niveau de créativité/aléatoire des réponses", "La longueur maximale", "Le nombre de tokens d'entrée"], correct: 1, explanation: "Temperature 0 = toujours le token le plus probable. Valeur élevée = plus de créativité.", difficulty: 2 },
    ],
  },
  // ── RAG ───────────────────────────────────────────────────────────────────
  rag: {
    theory: "RAG (Retrieval-Augmented Generation) combine les LLMs avec une base de connaissances externe. Fonctionnement : (1) Indexer des documents en embeddings vectoriels. (2) À chaque question, chercher les passages similaires. (3) Injecter ces passages dans le prompt du LLM pour une réponse ancrée dans les données réelles.",
    questions: [
      { q: "Quel problème des LLMs le RAG résout-il ?", answers: ["La lenteur de génération", "Le manque de connaissances récentes et les hallucinations factuelles", "Le coût d'entraînement", "La longueur des réponses"], correct: 1, explanation: "RAG ancre les réponses dans des documents réels et à jour, réduisant les hallucinations.", difficulty: 1 },
      { q: "Qu'est-ce qu'un embedding vectoriel ?", answers: ["Un format de compression", "Une représentation numérique du sens d'un texte dans un espace vectoriel", "Un type de BDD", "Un modèle ML simplifié"], correct: 1, explanation: "Des textes similaires ont des vecteurs proches. Permet la recherche sémantique.", difficulty: 2 },
      { q: "Dans quel ordre les étapes RAG s'exécutent-elles ?", answers: ["LLM → Retrieval → Réponse", "Retrieval → Augmentation du prompt → LLM génère", "LLM → Indexation → Retrieval", "Question → LLM → Vector DB"], correct: 1, explanation: "1) Convertir la question. 2) Chercher les passages. 3) Ajouter au prompt. 4) LLM génère avec contexte.", difficulty: 2 },
    ],
  },
  // ── PWA ───────────────────────────────────────────────────────────────────
  pwa: {
    theory: "Une PWA s'installe comme une app native. Trois piliers : Service Worker (cache offline, push notifications), Web App Manifest (icône, nom, display:standalone), HTTPS. Le Service Worker intercepte les requêtes et peut répondre depuis le cache, permettant le fonctionnement hors ligne.",
    questions: [
      { q: "Quels sont les trois piliers d'une PWA ?", answers: ["HTML, CSS, JS", "Service Worker, Manifest JSON, HTTPS", "React, Webpack, Babel", "Cache, Push, Notifications"], correct: 1, explanation: "Service Worker (offline), manifest.json (installation), HTTPS (obligatoire pour SW).", difficulty: 1 },
      { q: "Que fait un Service Worker ?", answers: ["Améliore le CSS", "Script en arrière-plan qui intercepte les requêtes et gère le cache", "Worker thread pour calculs", "Service de push marketing"], correct: 1, explanation: "Le Service Worker intercepte fetch(), répond depuis le cache et fonctionne hors ligne.", difficulty: 2 },
      { q: "Que contient le manifest.json d'une PWA ?", answers: ["Le code JS", "Les métadonnées : nom, icônes, couleurs, display mode", "La config du Service Worker", "Les routes de l'app"], correct: 1, explanation: "manifest.json : name, short_name, icons, start_url, display, theme_color, background_color.", difficulty: 2 },
    ],
  },
  // ── Testing ───────────────────────────────────────────────────────────────
  testing: {
    theory: "Les tests garantissent que le code fonctionne. Types : unitaires (une fonction), intégration (plusieurs modules), E2E (simulation utilisateur). Jest : describe() groupe les tests, test() définit un test, expect().toBe() vérifie une valeur. Les mocks remplacent les dépendances. Testing Library simule les interactions React.",
    questions: [
      { q: "Quelle fonction Jest définit un cas de test ?", answers: ["describe()", "assert()", "test() ou it()", "check()"], correct: 2, explanation: "test('description', () => { ... }) définit un test. describe() les regroupe.", difficulty: 1 },
      { q: "Comment vérifier avec Jest qu'une valeur vaut 42 ?", answers: ["assert(result, 42)", "expect(result).toBe(42)", "result.should.equal(42)", "check(result === 42)"], correct: 1, explanation: "expect(valeur).toBe(42) vérifie l'égalité stricte. .toEqual() compare les objets profondément.", difficulty: 1 },
      { q: "Qu'est-ce qu'un mock en testing ?", answers: ["Version minimale du code", "Faux remplacement d'une dépendance pour isoler le code testé", "Test d'intégration complet", "Résultat fictif"], correct: 1, explanation: "Les mocks remplacent des dépendances (API, DB) pour que les tests soient rapides et isolés.", difficulty: 2 },
      { q: "Différence entre tests unitaires et E2E ?", answers: ["E2E sont plus rapides", "Unitaires testent une fonction isolée, E2E simulent un vrai utilisateur dans le navigateur", "Les unitaires utilisent un navigateur", "Ils sont identiques"], correct: 1, explanation: "Unitaires : rapides, isolés. E2E (Cypress, Playwright) : lents, testent le flux complet.", difficulty: 2 },
    ],
  },
  // ── Performance ───────────────────────────────────────────────────────────
  performance: {
    theory: "L'optimisation des performances web améliore l'UX et le SEO. Core Web Vitals : LCP (< 2.5s), INP (< 200ms), CLS (< 0.1). Techniques : lazy loading (loading='lazy'), code splitting (import() dynamique), minification, CDN. En React : React.memo, useMemo, useCallback évitent les re-renders inutiles.",
    questions: [
      { q: "Qu'est-ce que le lazy loading des images ?", answers: ["Charger toutes les images en avance", "Charger une image seulement quand elle entre dans la zone visible", "Compresser les images", "Charger en basse résolution d'abord"], correct: 1, explanation: "loading='lazy' charge l'image seulement quand elle approche du viewport. Réduit le chargement initial.", difficulty: 1 },
      { q: "Que signifie LCP dans les Core Web Vitals ?", answers: ["Lowest Content Performance", "Largest Contentful Paint — temps d'affichage du plus grand élément", "Longest Code Path", "Last Cached Page"], correct: 1, explanation: "LCP mesure le temps d'affichage du plus grand élément visible. Cible : < 2.5 secondes.", difficulty: 2 },
      { q: "À quoi sert React.memo() ?", answers: ["Mémoïser les valeurs calculées", "Empêcher un composant de se re-rendre si ses props n'ont pas changé", "Mettre en cache les API", "Optimiser les animations"], correct: 1, explanation: "React.memo() re-rend le composant seulement si ses props changent.", difficulty: 2 },
    ],
  },
  // ── Accessibility ─────────────────────────────────────────────────────────
  accessibility: {
    theory: "L'accessibilité (a11y) garantit que les sites sont utilisables par tous. WCAG 2.1 définit les standards. Pratiques : balises sémantiques, texte alt sur les images, contraste suffisant (4.5:1 pour le texte normal), navigation au clavier (tabindex, focus), attributs ARIA pour les widgets complexes.",
    questions: [
      { q: "Quel attribut fournit une description aux lecteurs d'écran pour une image ?", answers: ["title", "alt", "aria-label", "description"], correct: 1, explanation: "alt décrit l'image. alt='' (vide) pour les images décoratives.", difficulty: 1 },
      { q: "Quel ratio de contraste minimum pour le texte normal selon WCAG AA ?", answers: ["2:1", "3:1", "4.5:1", "7:1"], correct: 2, explanation: "WCAG AA exige 4.5:1 pour le texte normal. Niveau AAA exige 7:1.", difficulty: 2 },
      { q: "Pourquoi la navigation au clavier est-elle importante ?", answers: ["Raccourcis clavier uniquement", "Pour les utilisateurs ne pouvant pas utiliser une souris", "Pour le SEO", "Pour les navigateurs sans JS"], correct: 1, explanation: "Les personnes avec handicaps moteurs naviguent au clavier. Tab, Enter, Espace, flèches doivent fonctionner.", difficulty: 2 },
    ],
  },
  // ── Design Patterns ───────────────────────────────────────────────────────
  "design-patterns": {
    theory: "Les design patterns sont des solutions réutilisables à des problèmes récurrents. Singleton : une seule instance globale. Factory : crée des objets sans exposer la logique. Observer : notification automatique des abonnés. Strategy : algorithme interchangeable. Decorator : ajoute des comportements sans modifier la classe.",
    questions: [
      { q: "Qu'est-ce que le pattern Singleton ?", answers: ["Une instance par fichier", "Garantir qu'une classe n'a qu'une seule instance globale", "Un composant React sans state", "Un module sans export default"], correct: 1, explanation: "Singleton : une seule instance partagée. Utile pour les connexions DB, les loggers.", difficulty: 2 },
      { q: "Quel pattern notifie automatiquement des abonnés quand un état change ?", answers: ["Factory", "Singleton", "Observer", "Adapter"], correct: 2, explanation: "Observer (Pub/Sub) : les subscribers s'enregistrent, l'objet les notifie au changement.", difficulty: 2 },
      { q: "Qu'est-ce que le pattern Strategy ?", answers: ["Choisir un algorithme aléatoirement", "Définir une famille d'algorithmes interchangeables selon le contexte", "Stratégie de tests", "Sélection du framework"], correct: 1, explanation: "Strategy encapsule l'algorithme et permet de le changer à l'exécution.", difficulty: 2 },
    ],
  },
  // ── SQL Advanced ──────────────────────────────────────────────────────────
  "sql-advanced": {
    theory: "Requêtes SQL avancées. Sous-requêtes imbriquées : WHERE salaire > (SELECT AVG(salaire) FROM employes). Fonctions de fenêtrage : ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salaire). CTE avec WITH pour des requêtes lisibles. Index accélèrent les lectures mais ralentissent les écritures.",
    questions: [
      { q: "Qu'est-ce qu'une sous-requête en SQL ?", answers: ["Une requête stockée", "Un SELECT imbriqué dans une autre requête", "Une vue SQL", "Une procédure stockée"], correct: 1, explanation: "Une sous-requête s'exécute d'abord. Ex: WHERE id IN (SELECT user_id FROM orders WHERE total > 100).", difficulty: 2 },
      { q: "Que fait ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salaire DESC) ?", answers: ["Compte les employés", "Attribue un numéro dans chaque département, trié par salaire décroissant", "Trie les résultats finaux", "Crée un index"], correct: 1, explanation: "PARTITION BY recrée les numéros à chaque groupe. ORDER BY définit l'ordre.", difficulty: 2 },
      { q: "Qu'est-ce qu'un CTE (Common Table Expression) ?", answers: ["Un index optimisé", "Résultat intermédiaire nommé avec WITH, réutilisable dans la requête", "Une table temporaire permanente", "Une procédure stockée"], correct: 1, explanation: "WITH ma_cte AS (SELECT ...) SELECT * FROM ma_cte. Rend les requêtes complexes lisibles.", difficulty: 2 },
    ],
  },
  // ── Monolith vs Microservices ─────────────────────────────────────────────
  "monolith-microservices": {
    theory: "Un monolithe déploie tous les modules ensemble — simple pour débuter. Les microservices décomposent en services indépendants avec leur BDD et API. Avantages microservices : scalabilité, technologies mixtes, résilience. Inconvénients : complexité réseau, transactions distribuées. Règle : commencer monolithique, migrer quand la complexité le justifie.",
    questions: [
      { q: "Quel avantage principal d'une architecture monolithique pour une startup ?", answers: ["Scalabilité infinie", "Simplicité de développement, déploiement et débogage", "Meilleure résilience aux pannes", "Facilité de migration cloud"], correct: 1, explanation: "Un monolithe est plus simple à développer, tester et déployer.", difficulty: 1 },
      { q: "Quel problème des microservices n'existe pas dans un monolithe ?", answers: ["Débogage des erreurs", "Transactions distribuées et cohérence des données entre services", "Lenteur du développement", "Usage de plusieurs langages"], correct: 1, explanation: "Dans un monolithe, une transaction DB est simple. Dans les microservices, coordonner plusieurs services est complexe.", difficulty: 2 },
    ],
  },
  // ── REST API ──────────────────────────────────────────────────────────────
  "rest-api": {
    theory: "REST (Representational State Transfer) est un style d'architecture pour les APIs web. Principes : stateless, ressources identifiées par des URLs (/users, /users/1), manipulation via les méthodes HTTP. Convention : GET /users (liste), GET /users/:id (un), POST /users (créer), PUT /users/:id (modifier), DELETE /users/:id (supprimer). Format : JSON.",
    questions: [
      { q: "Quelle URL RESTful récupère la liste de tous les articles ?", answers: ["/article/all", "/articles", "/getArticles", "/article?mode=list"], correct: 1, explanation: "En REST, les ressources sont au pluriel (/articles). GET /articles = liste, GET /articles/1 = un seul.", difficulty: 1 },
      { q: "Qu'est-ce que 'stateless' dans une API REST ?", answers: ["L'API n'a pas de variables d'état JS", "Chaque requête contient toutes les informations nécessaires — le serveur ne stocke pas la session", "L'API n'utilise pas de base de données", "L'API retourne toujours le même résultat"], correct: 1, explanation: "Stateless : le serveur ne se souvient pas des requêtes précédentes. Authentification via JWT à chaque requête.", difficulty: 2 },
      { q: "Que signifie CRUD dans le contexte des APIs REST ?", answers: ["Code, Run, Update, Deploy", "Create, Read, Update, Delete — les 4 opérations fondamentales", "Connect, Route, Understand, Deliver", "Cache, Respond, Undo, Deploy"], correct: 1, explanation: "CRUD = Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE).", difficulty: 1 },
    ],
  },
  // ── ORM ───────────────────────────────────────────────────────────────────
  orm: {
    theory: "Un ORM (Object-Relational Mapper) fait le pont entre les objets JavaScript et les tables SQL. Avantages : pas de SQL brut, protection automatique contre les injections SQL, migrations versionnées. Prisma est l'ORM moderne pour Node.js : on définit les modèles dans schema.prisma, Prisma génère un client TypeScript typé.",
    questions: [
      { q: "Quel est l'avantage principal d'un ORM par rapport au SQL brut ?", answers: ["Toujours plus rapide qu'une requête SQL directe", "Abstraction objet, protection injection SQL, productivité et migrations versionées", "Il supporte uniquement MySQL", "Il génère automatiquement des interfaces React"], correct: 1, explanation: "L'ORM génère des requêtes paramétrées (protection injection SQL) et offre une API objet intuitive.", difficulty: 1 },
      { q: "Quelle méthode Prisma est équivalente à SELECT * FROM users WHERE active = true ?", answers: ["prisma.users.selectAll({active: true})", "prisma.user.findMany({ where: { active: true } })", "prisma.user.query('active=true')", "prisma.user.getAll({ filter: 'active' })"], correct: 1, explanation: "findMany() avec where est l'équivalent Prisma d'un SELECT ... WHERE. Le client est entièrement typé TypeScript.", difficulty: 2 },
      { q: "Que fait la commande 'npx prisma migrate dev' ?", answers: ["Démarre un serveur de développement Prisma", "Génère et applique les migrations SQL, puis régénère le client Prisma", "Réinitialise entièrement la base de données", "Installe Prisma dans le projet"], correct: 1, explanation: "prisma migrate dev compare le schéma et la DB, génère un fichier SQL de migration, l'applique et régénère le client typé.", difficulty: 2 },
    ],
  },
  // ── Queues ────────────────────────────────────────────────────────────────
  queues: {
    theory: "Les files de messages permettent le traitement asynchrone de tâches longues. Bull/BullMQ est la bibliothèque Node.js la plus populaire, basée sur Redis. Workflow : 1) Le serveur ajoute un job à la queue. 2) Un worker consomme et traite le job indépendamment. Avantages : retry automatique, plusieurs workers en parallèle, découplage.",
    questions: [
      { q: "Pourquoi utilise-t-on une queue pour l'envoi d'emails ?", answers: ["Les emails sont synchrones par nature", "Pour ne pas bloquer la réponse HTTP — l'email est traité en arrière-plan par un worker", "Les emails sont trop volumineux pour HTTP", "Pour mémoriser l'historique des emails envoyés"], correct: 1, explanation: "Envoyer un email peut prendre 1-2 secondes. Avec une queue, la réponse est immédiate.", difficulty: 2 },
      { q: "Quel service de stockage Bull/BullMQ utilise-t-il comme backend ?", answers: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ"], correct: 2, explanation: "Bull/BullMQ stocke les jobs dans Redis. Sa rapidité en mémoire est idéale pour une queue.", difficulty: 2 },
      { q: "Quel est le principal bénéfice de traiter les tâches lourdes via une queue ?", answers: ["Réduire le nombre de lignes de code", "L'utilisateur reçoit une réponse rapide et les tâches longues se traitent en arrière-plan", "Éviter d'utiliser une base de données", "Simplifier l'architecture à un seul serveur"], correct: 1, explanation: "L'utilisateur n'attend pas : la réponse HTTP est immédiate. Le traitement se fait en arrière-plan.", difficulty: 1 },
    ],
  },
  // ── Hosting ───────────────────────────────────────────────────────────────
  hosting: {
    theory: "Le déploiement rend votre application accessible sur internet. Vercel est idéal pour les frontends React/Next.js. Railway et Render hébergent des serveurs Node.js et bases de données. Les variables d'environnement stockent les secrets hors du code source. Un certificat SSL/TLS active HTTPS.",
    questions: [
      { q: "Pourquoi ne jamais commiter des clés API dans le code source (Git) ?", answers: ["Les clés sont trop longues pour Git", "Le dépôt peut être public — des robots scannent GitHub en permanence pour voler les secrets", "Git compresse automatiquement les clés", "Cela ralentit git push"], correct: 1, explanation: "Des bots scannent GitHub en continu. Une clé API exposée peut être exploitée en secondes. Utiliser .env (dans .gitignore).", difficulty: 1 },
      { q: "Qu'est-ce qu'un certificat SSL/TLS ?", answers: ["Un fichier de configuration du serveur web", "Un certificat cryptographique activant HTTPS et chiffrant les données en transit", "Une licence commerciale pour héberger un site", "Un plugin de sécurité Express"], correct: 1, explanation: "SSL/TLS chiffre les données entre navigateur et serveur. Obligatoire pour les mots de passe, cartes bancaires. Gratuit via Let's Encrypt.", difficulty: 2 },
      { q: "Quelle bonne pratique pour gérer les variables d'environnement ?", answers: ["Les stocker dans un fichier config.js versionné", "Fichier .env local (dans .gitignore) en dev, variables de la plateforme en prod — jamais dans Git", "Les encoder en Base64 dans le code source", "Les passer uniquement en arguments CLI"], correct: 1, explanation: ".env local + .gitignore pour le développement. Variables d'environnement de la plateforme en production.", difficulty: 2 },
    ],
  },
  // ── Stripe ────────────────────────────────────────────────────────────────
  stripe: {
    theory: "Stripe est la plateforme de paiement de référence. Architecture sécurisée : Stripe Elements capture les données de carte dans une iframe isolée côté client — les données sensibles n'atteignent jamais votre serveur (conformité PCI DSS). Côté serveur : créer un PaymentIntent, retourner le client_secret au front. Le front confirme avec stripe.confirmCardPayment(). Les webhooks notifient des événements asynchrones.",
    questions: [
      { q: "Pourquoi Stripe Elements gère le formulaire de carte dans une iframe ?", answers: ["Pour éviter d'apprendre le CSS des formulaires", "Les données de carte n'atteignent jamais votre serveur — conformité PCI DSS automatique", "Pour supporter plus de navigateurs anciens", "Pour la validation automatique du CVV"], correct: 1, explanation: "Si les données passaient par votre serveur, vous seriez soumis à la certification PCI DSS. Avec Stripe Elements, seul Stripe manipule les données sensibles.", difficulty: 2 },
      { q: "Où doit uniquement être utilisée la clé secrète Stripe (sk_...) ?", answers: ["Côté client dans le bundle JavaScript public", "Uniquement côté serveur, jamais exposée au navigateur", "Dans le fichier manifest.json de la PWA", "Dans les variables CSS du thème"], correct: 1, explanation: "La clé secrète (sk_live_...) permet de créer des PaymentIntents. Elle ne doit JAMAIS être dans le code client.", difficulty: 1 },
      { q: "Comment tester les paiements Stripe sans débiter une vraie carte ?", answers: ["Utiliser la carte 0000 0000 0000 0000", "Utiliser les clés de test (pk_test_, sk_test_) avec les numéros fournis par Stripe", "Désactiver la validation côté serveur", "Utiliser PayPal sandbox"], correct: 1, explanation: "Mode test : pk_test_ et sk_test_. Stripe fournit des cartes de test comme 4242 4242 4242 4242. Aucun vrai débit.", difficulty: 1 },
    ],
  },
  // ── Generic (fallback) ────────────────────────────────────────────────────
  generic: {
    theory: "Le développement logiciel s'appuie sur des principes qui transcendent les langages : écrire du code lisible, le tester, le documenter et le maintenir. Le principe DRY (Don't Repeat Yourself) évite la duplication. KISS (Keep It Simple, Stupid) préfère la simplicité. Les tests unitaires vérifient que chaque fonction fait bien ce qu'elle doit faire. La revue de code (code review) améliore la qualité collective.",
    questions: [
      { q: "Que signifie DRY en programmation ?", answers: ["Don't Run Yourself", "Don't Repeat Yourself", "Do Refactor Yearly", "Debug, Review, Yield"], correct: 1, explanation: "DRY (Don't Repeat Yourself) : chaque logique doit exister à un seul endroit. La duplication rend la maintenance difficile — modifier une logique oblige à chercher toutes ses copies. Préférer des fonctions réutilisables." },
      { q: "Qu'est-ce qu'un test unitaire ?", answers: ["Un test de l'interface utilisateur", "Un test d'un seul module ou fonction en isolation", "Un test de charge", "Un test manuel"], correct: 1, explanation: "Un test unitaire vérifie qu'une fonction individuelle fait ce qu'on attend. Les dépendances sont simulées (mocks). Ils sont rapides, automatisés et servent de documentation du comportement attendu." },
      { q: "Que signifie 'refactoring' ?", answers: ["Réécrire l'app de zéro", "Améliorer la structure du code sans changer son comportement", "Corriger des bugs", "Ajouter de nouvelles fonctionnalités"], correct: 1, explanation: "Refactorer c'est améliorer la lisibilité ou la structure du code existant sans changer ce qu'il fait. On s'assure que les tests continuent de passer. C'est une pratique continue, pas un projet à part." },
      { q: "Qu'est-ce qu'une API REST ?", answers: ["Un protocole de base de données", "Un framework JavaScript", "Des conventions pour créer des services web via HTTP", "Un langage de requête"], correct: 2, explanation: "REST utilise les méthodes HTTP (GET lire, POST créer, PUT modifier, DELETE supprimer) et des URLs claires pour identifier les ressources. Le format d'échange est généralement JSON." },
      { q: "Que signifie le principe KISS ?", answers: ["Keep It Simple, Stupid", "Kill Invalid Slow Software", "Keep Implementing Safe Syntax", "Know It's Syntax Sugar"], correct: 0, explanation: "KISS : Keep It Simple, Stupid. La solution la plus simple qui fonctionne est souvent la meilleure. La complexité est le principal ennemi de la maintenabilité." },
      { q: "Quelle est la différence entre un bug et une feature ?", answers: ["Aucune, c'est la même chose", "Un bug est un comportement non intentionnel, une feature est une fonctionnalité voulue", "Un bug est plus difficile à corriger", "Une feature est gratuite, un bug coûte cher"], correct: 1, explanation: "Un bug est un comportement incorrect ou inattendu du programme. Une feature est une fonctionnalité intentionnellement ajoutée. La blague 'c'est pas un bug, c'est une feature' vient de cette frontière parfois floue." },
      { q: "Qu'est-ce que le versionnement sémantique (semver) ?", answers: ["Git a été créé par Linus Torvalds", "Un système de numérotation MAJOR.MINOR.PATCH pour les versions de logiciels", "Un outil de gestion des versions", "Une convention de commits"], correct: 1, explanation: "Semver : 2.3.1 = MAJOR.MINOR.PATCH. MAJOR change quand l'API change de façon incompatible. MINOR pour les nouvelles fonctionnalités rétrocompatibles. PATCH pour les corrections de bugs." },
      { q: "Qu'est-ce que la dette technique ?", answers: ["Le coût d'une licence logicielle", "Le travail accumulé dû à des choix de développement rapides mais imparfaits", "Le nombre de bugs non corrigés", "Les frais d'hébergement"], correct: 1, explanation: "La dette technique est comme une dette financière : prendre des raccourcis aujourd'hui pour livrer vite crée un 'intérêt' à payer plus tard — code difficile à maintenir, bugs plus fréquents, lenteur des nouvelles fonctionnalités." },
      { q: "Qu'est-ce que le débogage (debugging) ?", answers: ["Écrire des commentaires dans le code", "Trouver et corriger la cause d'un bug", "Supprimer du code inutile", "Tester l'application manuellement"], correct: 1, explanation: "Déboguer c'est enquêter sur un bug : reproduire le problème, isoler la cause, comprendre pourquoi ça arrive, corriger et vérifier. Les outils : console.log, le debugger du navigateur, les breakpoints." },
      { q: "Qu'est-ce qu'un environnement de développement par rapport à la production ?", answers: ["Aucune différence", "Dev est local pour les développeurs, prod sert les vrais utilisateurs", "La prod est plus lente", "Le dev utilise une vraie base de données"], correct: 1, explanation: "Dev : configuration locale, données de test, logs détaillés, hot-reload. Prod : optimisé, sécurisé, avec de vraies données utilisateurs. On teste en dev, on déploie en prod après validation." },
      { q: "Qu'est-ce que l'intégration continue (CI) ?", answers: ["Intégrer des APIs externes", "Automatiser les tests et vérifications à chaque modification de code", "Fusionner les branches manuellement", "Déployer en production automatiquement"], correct: 1, explanation: "CI (Continuous Integration) : à chaque push, un système automatisé lance les tests, vérifie le code, et signale les problèmes. GitHub Actions et GitLab CI sont des outils CI populaires." },
      { q: "Que signifie 'open source' ?", answers: ["Le logiciel est gratuit", "Le code source est public et peut être lu, modifié et redistribué", "Le logiciel tourne dans le cloud", "Le logiciel est sans licence"], correct: 1, explanation: "Open source signifie que le code est disponible publiquement. Chacun peut lire, modifier, contribuer et redistribuer (selon la licence). React, Linux, Python sont open source. Gratuit et open source ne sont pas synonymes." },
    ],
  },
};

function detectTopicKey(levelName) {
  const n = levelName.toLowerCase();

  // ── HTTP / Protocoles réseau ──
  if (n.includes("http") && (n.includes("protocole") || n.includes("web") || n.includes("réseau"))) return "http";

  // ── HTML ──
  if (n.includes("html") && (n.includes("formulaire") || n.includes("média") || n.includes("media") || n.includes("form"))) return "html-forms";
  if (n.includes("html")) return "html";

  // ── CSS ──
  if (n.includes("flexbox") || (n.includes("css") && n.includes("flex"))) return "flexbox";
  if (n.includes("grid") && (n.includes("css") || n.includes("layout") || n.includes("grille"))) return "grid";
  if (n.includes("responsive") || n.includes("media quer") || n.includes("media-quer")) return "css-responsive";
  if (n.includes("css")) return "css";

  // ── JavaScript ──
  if (n.includes("dom") || n.includes("manipulation")) return "dom";
  if ((n.includes("event") || n.includes("événement")) && !n.includes("loop")) return "js-events";
  if (n.includes("api") && n.includes("rest") && !n.includes("fetch")) return "rest-api";
  if (n.includes("fetch") || (n.includes("api") && n.includes("rest"))) return "js-fetch";
  if (n.includes("promise") || n.includes("async") || n.includes("await")) return "async";
  if (n.includes("module") && (n.includes("es") || n.includes("js"))) return "js-modules";
  if (n.includes("fonctions") || n.includes("scope") || n.includes("closure") || (n.includes("js") && n.includes("fonction"))) return "js-functions";
  if (n.includes("javascript") || n.includes("js —") || n.includes("variable") || n.includes("type")) return "javascript";

  // ── React ──
  if (n.includes("react") && (n.includes("hook") || n.includes("usestate") || n.includes("useeffect") || n.includes("usememo"))) return "react-hooks";
  if (n.includes("react") && (n.includes("state") || n.includes("props") || n.includes("context"))) return "react-state";
  if (n.includes("react") || n.includes("jsx") || n.includes("composant")) return "react";
  if (n.includes("crud") && (n.includes("react") || n.includes("node"))) return "react";

  // ── Vue.js / TypeScript ──
  if (n.includes("vue.js") || n.includes("vuejs") || n.includes("vue —")) return "vuejs";
  if (n.includes("typescript") || n.includes("types &") || n.includes("interface")) return "typescript";

  // ── Node.js / Express ──
  if ((n.includes("node") || n.includes("npm")) && (n.includes("module") || n.includes("npm"))) return "nodejs-modules";
  if (n.includes("node") || n.includes("npm") || n.includes("express") || n.includes("variable d")) return "nodejs";

  // ── SQL & Data ──
  if (n.includes("jointure") || n.includes("join") || n.includes("inner") || n.includes("left") || n.includes("right")) return "sql-joins";
  if (n.includes("agrégation") || n.includes("group by") || n.includes("aggreg")) return "sql-aggregations";
  if (n.includes("sous-requête") || n.includes("transaction") || n.includes("acid") || n.includes("index") || n.includes("fenêtre") || n.includes("over") || n.includes("normalisation") || n.includes("modélisation")) return "sql-advanced";
  if (n.includes("sql") || n.includes("requête") || n.includes("select") || n.includes("filtres")) return "sql";

  // ── Git ──
  if (n.includes("git") && (n.includes("merge") || n.includes("rebase") || n.includes("conflit"))) return "git-advanced";
  if (n.includes("git") || n.includes("branche") || n.includes("commit")) return "git";
  if (n.includes("github actions") || n.includes("workflows") || n.includes("ci/cd") || n.includes("gitlab")) return "github-actions";

  // ── Docker / Kubernetes / Cloud ──
  if (n.includes("kubernetes") || n.includes("pods") || n.includes("k8s")) return "kubernetes";
  if (n.includes("docker") || n.includes("conteneur") || n.includes("compose")) return "docker";
  if (n.includes("aws") || n.includes("amazon")) return "aws";

  // ── Auth & Sécurité ──
  if (n.includes("jwt") || n.includes("authentification") || n.includes("oauth") || n.includes("hachage") || n.includes("cryptographie") || n.includes("sécuris")) return "jwt";

  // ── Bases de données NoSQL ──
  if (n.includes("mongodb") || n.includes("document") || n.includes("collection")) return "mongodb";
  if (n.includes("redis") || n.includes("cache") || n.includes("session")) return "redis";

  // ── GraphQL / WebSockets ──
  if (n.includes("graphql") || n.includes("schéma") || n.includes("resolver")) return "graphql";
  if (n.includes("websocket") || n.includes("socket") || n.includes("temps réel")) return "websockets";

  // ── Linux / Bash / SSH ──
  if (n.includes("bash") || n.includes("scripting") || n.includes("shell")) return "bash";
  if (n.includes("upload")) return "nodejs-modules";
  if (n.includes("linux") || n.includes("commande") || n.includes("fichiers") || n.includes("permission") || n.includes("ssh")) return "linux";

  // ── IA & ML ──
  if (n.includes("machine learning") || n.includes("apprentissage") || n.includes("ml") || n.includes("dataset") || n.includes("feature") || n.includes("régression") || n.includes("arbre") || n.includes("random forest") || n.includes("évaluation") || n.includes("métrique")) return "ml-concepts";
  if (n.includes("python") || n.includes("numpy") || n.includes("pandas") || n.includes("matplotlib") || n.includes("data science")) return "python-data";
  if (n.includes("llm") || n.includes("language model") || n.includes("transformer")) return "llm";
  if (n.includes("prompt") || n.includes("prompting")) return "prompt-eng";
  if (n.includes("rag") || n.includes("retrieval") || n.includes("augmented")) return "rag";

  // ── Frontend avancé ──
  if (n.includes("pwa") || n.includes("progressive web") || n.includes("service worker")) return "pwa";
  if (n.includes("test") || n.includes("jest") || n.includes("testing library")) return "testing";
  if (n.includes("performance") || n.includes("optimis") || n.includes("vite") || n.includes("webpack") || n.includes("build tool")) return "performance";
  if (n.includes("accessibilité") || n.includes("a11y") || n.includes("wcag")) return "accessibility";

  // ── Architecture Full Stack ──
  if (n.includes("microservice") || n.includes("monolithe")) return "monolith-microservices";
  if (n.includes("design pattern") || n.includes("pattern") || n.includes("mvc") || n.includes("api-first") || n.includes("architecture")) return "design-patterns";

  // ── ORM & Queues ──
  if (n.includes("orm") || n.includes("prisma") || n.includes("sequelize")) return "orm";
  if (n.includes("queue") || n.includes("worker") || n.includes("bull")) return "queues";

  // ── Paiement & Déploiement ──
  if (n.includes("stripe") || n.includes("paiement")) return "stripe";
  if (n.includes("hébergement") || n.includes("vercel") || n.includes("railway") || n.includes("ssl") || n.includes("domaine") || n.includes("certificat") || n.includes("déploiement") || n.includes("render")) return "hosting";

  return "generic";
}

function getDifficultyFromSection(sectionTitle) {
  const t = (sectionTitle || "").toLowerCase();
  if (t.includes("avancé") || t.includes("frameworks") || t.includes("sécurité") || t.includes("llm") || t.includes("prompting") || t.includes("déploiement")) return 3;
  if (t.includes("javascript") || t.includes("bases de données") || t.includes("conteneur") || t.includes("git") || t.includes("modèles") || t.includes("projet") || t.includes("ci/cd")) return 2;
  return 1;
}

// ─── Banque de questions EN/ES (pour i18n complète) ─────────────────────────
const MOCK_DB_EN = {
  html: {
    theory: "HTML (HyperText Markup Language) is the markup language that structures web content. Each HTML element is defined by opening and closing tags, such as p for a paragraph or h1 for a main heading. HTML semantics allow browsers and search engines to understand the meaning of content: article, nav, and section are semantic HTML5 tags. A well-structured document always starts with DOCTYPE html, then html, head, and body tags.",
    questions: [
      { q: "Which HTML tag represents the most important heading?", answers: ["h6", "title", "h1", "header"], correct: 2, explanation: "h1 is the level 1 heading, the most important hierarchically. Search engines give it significant SEO weight.", difficulty: 1, topicTags:["html","semantics"] },
      { q: "Which tag is used to create a hyperlink?", answers: ["link", "a", "href", "url"], correct: 1, explanation: "The 'a' (anchor) tag creates links. The href attribute defines the destination.", difficulty: 1, topicTags:["html","links"] },
      { q: "How do you insert an image in HTML?", answers: ["image src=''", "img src=''", "img href=''", "picture src=''"], correct: 1, explanation: "img is a self-closing tag. src points to the file and alt provides an accessible text description.", difficulty: 1, topicTags:["html","media"] },
      { q: "Which attribute makes a form field required?", answers: ["mandatory", "required", "validate", "must"], correct: 1, explanation: "The 'required' attribute prevents form submission if the field is empty. It is native HTML validation.", difficulty: 1, topicTags:["html","forms"] },
      { q: "Which HTML5 element is most appropriate for the main content?", answers: ["div.main", "section", "main", "content"], correct: 2, explanation: "main indicates the unique primary content of the page and helps assistive technologies.", difficulty: 1, topicTags:["html","semantics"] },
      { q: "What is the difference between div and span?", answers: ["No difference", "div is block, span is inline", "span is block, div is inline", "div is obsolete"], correct: 1, explanation: "div is a block-level element that takes the full width. span is inline and does not create a line break.", difficulty: 1, topicTags:["html","layout"] },
      { q: "Which tag is semantically correct for main navigation?", answers: ["div#nav", "navigation", "nav", "menu"], correct: 2, explanation: "nav is the dedicated HTML5 semantic tag for main navigation.", difficulty: 1, topicTags:["html","semantics"] },
      { q: "How do you create an unordered list in HTML?", answers: ["ol + li", "ul + li", "list + item", "nl + li"], correct: 1, explanation: "ul (unordered list) creates a bulleted list. Each item is in an li tag. ol creates a numbered list.", difficulty: 1, topicTags:["html","lists"] },
      { q: "What does the alt attribute do on an img tag?", answers: ["Sets image title", "Provides text description for accessibility", "Links to another image", "Defines image size"], correct: 1, explanation: "alt text is read by screen readers and displayed when the image fails to load. It is essential for accessibility.", difficulty: 1, topicTags:["html","accessibility"] },
      { q: "Which HTML element defines the document's character encoding?", answers: ["<encoding>", "<charset>", "<meta charset='UTF-8'>", "<head charset='UTF-8'>"], correct: 2, explanation: "meta charset='UTF-8' declares the character encoding. UTF-8 supports virtually all characters and is the standard.", difficulty: 1, topicTags:["html","meta"] },
      { q: "What is the purpose of the doctype declaration?", answers: ["Defines the CSS version", "Tells the browser this is an HTML document", "Loads a JavaScript file", "Sets the page title"], correct: 1, explanation: "<!DOCTYPE html> tells the browser to render the page in standards mode. Without it, browsers may enter quirks mode.", difficulty: 1, topicTags:["html","structure"] },
      { q: "Which tag creates a table row?", answers: ["td", "th", "tr", "row"], correct: 2, explanation: "tr (table row) wraps a row of cells. td contains data cells, th contains header cells.", difficulty: 1, topicTags:["html","tables"] },
      { q: "What attribute specifies where a form sends data?", answers: ["method", "action", "target", "send"], correct: 1, explanation: "The action attribute defines the URL where form data is submitted. method defines GET or POST.", difficulty: 2, topicTags:["html","forms"] },
      { q: "Which input type validates email format natively?", answers: ["type='mail'", "type='email'", "type='contact'", "type='text'"], correct: 1, explanation: "type='email' performs native email format validation. The browser shows an error if the format is invalid.", difficulty: 1, topicTags:["html","forms"] },
      { q: "What does the label for attribute do?", answers: ["Names the label", "Associates label with an input by id", "Sets label color", "Positions the label"], correct: 1, explanation: "for='input-id' associates the label with the input. Clicking the label focuses the input, improving usability.", difficulty: 2, topicTags:["html","accessibility","forms"] },
    ],
  },
  css: {
    theory: "CSS (Cascading Style Sheets) controls the visual appearance of HTML elements. CSS rules follow the syntax: selector { property: value; }. The cascade determines which rule applies in case of conflict, based on selector specificity and order of appearance. Selectors range from the most general (tag) to the most specific (id), with classes in between. Understanding specificity avoids most common CSS bugs.",
    questions: [
      { q: "Which CSS property changes text color?", answers: ["font-color", "text-color", "color", "foreground"], correct: 2, explanation: "The 'color' property sets the text color. It accepts named values, hexadecimal, RGB, or HSL.", difficulty: 1, topicTags:["css","colors"] },
      { q: "Which CSS selector has the highest specificity?", answers: [".class", "tag", "#id", "* (universal)"], correct: 2, explanation: "ID selectors (#id) have higher specificity than classes and tags.", difficulty: 1, topicTags:["css","specificity"] },
      { q: "Which CSS property creates internal spacing inside an element?", answers: ["margin", "padding", "border", "spacing"], correct: 1, explanation: "Padding is the space between the content and the border. Margin is the external space between the element and its neighbors.", difficulty: 1, topicTags:["css","box-model"] },
      { q: "What does box-sizing: border-box do?", answers: ["Adds an automatic border", "Includes padding and border in total width", "Removes the box model", "Centers the element"], correct: 1, explanation: "With border-box, width: 200px already includes padding and border. Without it, they add to the declared width.", difficulty: 1, topicTags:["css","box-model"] },
      { q: "Which CSS unit is relative to the font size of the parent element?", answers: ["px", "em", "rem", "vh"], correct: 1, explanation: "em is relative to the parent's font-size. rem is relative to the root element, more predictable.", difficulty: 1, topicTags:["css","units"] },
      { q: "How do you apply style only to the first child?", answers: [".first-child", ":first-child", "::first-child", "#first"], correct: 1, explanation: ":first-child is a pseudo-class that targets the first child. :nth-child(1) is equivalent.", difficulty: 1, topicTags:["css","selectors"] },
      { q: "Which position value removes an element from normal flow?", answers: ["relative", "static", "absolute", "inherit"], correct: 2, explanation: "absolute and fixed remove the element from flow. absolute positions relative to the nearest positioned parent.", difficulty: 1, topicTags:["css","positioning"] },
      { q: "How do you horizontally center a block with modern CSS?", answers: ["text-align: center", "margin: auto", "display: flex + justify-content: center", "position: center"], correct: 2, explanation: "On a flex container, justify-content: center aligns children at the center of the main axis. Most robust method.", difficulty: 1, topicTags:["css","layout"] },
      { q: "What does transition do in CSS?", answers: ["Creates animations", "Smoothly animates property changes over time", "Transforms elements", "Triggers on hover only"], correct: 1, explanation: "transition: property duration easing makes CSS property changes animate smoothly instead of jumping instantly.", difficulty: 1, topicTags:["css","animations"] },
      { q: "What does z-index control?", answers: ["Element zoom level", "Stacking order along the z-axis", "Element size", "Opacity"], correct: 1, explanation: "z-index controls which element appears on top when elements overlap. Higher z-index = on top. Only works on positioned elements.", difficulty: 1, topicTags:["css","positioning"] },
      { q: "What is a CSS custom property (variable)?", answers: ["A class that changes value", "--name: value; accessible via var(--name)", "A JavaScript variable", "A Sass variable"], correct: 1, explanation: "CSS variables: --primary-color: #3b82f6; used with var(--primary-color). They inherit and can be overridden in any scope.", difficulty: 2, topicTags:["css","variables"] },
      { q: "Which CSS property controls the order of flex items?", answers: ["z-index", "flex-order", "order", "sort"], correct: 2, explanation: "The order property changes display order without modifying HTML. Default is 0 for all items.", difficulty: 2, topicTags:["css","flexbox"] },
      { q: "What does opacity: 0 do compared to visibility: hidden?", answers: ["They are identical", "opacity: 0 hides visually but keeps space and is clickable; visibility: hidden keeps space but not clickable", "visibility: hidden removes element from layout", "opacity: 0 removes the element"], correct: 1, explanation: "Both hide the element visually. opacity: 0 still receives pointer events. visibility: hidden does not. display: none removes from flow entirely.", difficulty: 2, topicTags:["css","visibility"] },
      { q: "What is the difference between rem and em units?", answers: ["No difference", "rem is relative to root font-size; em is relative to parent font-size", "em is always 16px", "rem only works for font sizes"], correct: 1, explanation: "rem: always relative to <html> font-size, predictable. em: relative to current element's parent, can compound unpredictably.", difficulty: 2, topicTags:["css","units"] },
      { q: "What does display: none do?", answers: ["Makes element transparent", "Removes element from layout entirely (no space)", "Hides element but keeps space", "Makes element invisible but interactive"], correct: 1, explanation: "display: none removes the element from the document flow — it takes up no space and cannot be interacted with.", difficulty: 1, topicTags:["css","display"] },
    ],
  },
  javascript: {
    theory: "JavaScript is the programming language of the web. It allows pages to become interactive. A variable stores a value — declared with let (mutable) or const (constant). JavaScript has several data types: strings, numbers, booleans (true/false), arrays, and objects. A function groups instructions for reuse: function sayHello() { console.log('Hello!'); }.",
    questions: [
      { q: "How do you declare a variable that won't change in JavaScript?", answers: ["var", "let", "const", "static"], correct: 2, explanation: "const declares a constant: its value cannot be reassigned. let declares a mutable variable. Use const by default.", difficulty: 1, topicTags:["js","variables"] },
      { q: "What type does typeof 'hello' return?", answers: ["'text'", "'string'", "'word'", "'char'"], correct: 1, explanation: "typeof returns the type of a value. typeof 'hello' returns 'string'. typeof 42 returns 'number'.", difficulty: 1, topicTags:["js","types"] },
      { q: "How do you print text to the browser console?", answers: ["print('text')", "console.log('text')", "log('text')", "display('text')"], correct: 1, explanation: "console.log() prints a message to the developer tools console. It is the basic debugging tool in JavaScript.", difficulty: 1, topicTags:["js","debugging"] },
      { q: "What is the value of 5 + '3' in JavaScript?", answers: ["8", "'53'", "Error", "NaN"], correct: 1, explanation: "When adding a number and a string, JavaScript converts the number to text and concatenates. 5 + '3' gives '53'.", difficulty: 1, topicTags:["js","types","coercion"] },
      { q: "How do you create an array in JavaScript?", answers: ["let arr = (1, 2, 3)", "let arr = {1, 2, 3}", "let arr = [1, 2, 3]", "let arr = <1, 2, 3>"], correct: 2, explanation: "Arrays use square brackets []. let fruits = ['apple', 'banana']. Elements are accessed by zero-based index.", difficulty: 1, topicTags:["js","arrays"] },
      { q: "How do you write an if...else statement in JavaScript?", answers: ["when...otherwise", "if...else", "check...default", "test...fallback"], correct: 1, explanation: "if...else is the basic conditional structure. if (condition) { ... } else { ... }.", difficulty: 1, topicTags:["js","control-flow"] },
      { q: "Which method adds an element to the end of an array?", answers: ["array.add()", "array.append()", "array.push()", "array.insert()"], correct: 2, explanation: "push() adds one or more elements to the end. pop() removes and returns the last element.", difficulty: 1, topicTags:["js","arrays"] },
      { q: "How do you write a loop that repeats 5 times?", answers: ["repeat(5) { }", "loop 5 times { }", "for (let i = 0; i < 5; i++) { }", "while i < 5 { }"], correct: 2, explanation: "The classic for loop: initialization, condition, and increment. It repeats while the condition is true.", difficulty: 1, topicTags:["js","loops"] },
      { q: "What does 'hello'.length return?", answers: ["5", "'hello'", "6", "undefined"], correct: 0, explanation: "The .length property gives the number of characters in a string. 'hello' has 5 characters.", difficulty: 1, topicTags:["js","strings"] },
      { q: "How do you check strict equality in JavaScript?", answers: ["=", "==", "===", "equals()"], correct: 2, explanation: "=== (triple equals) checks both value AND type. 5 === '5' is false. == converts types before comparing, which can cause bugs.", difficulty: 1, topicTags:["js","operators"] },
      { q: "What is an arrow function?", answers: ["A function with an arrow in its name", "Shorthand function syntax: () => {}", "A function that points to a DOM element", "An anonymous classic function"], correct: 1, explanation: "Arrow functions (ES6): const double = (n) => n * 2; shorter than function double(n) { return n * 2; }. No own 'this'.", difficulty: 1, topicTags:["js","functions"] },
      { q: "What does the .map() method do on an array?", answers: ["Draws a geographic map", "Returns a new transformed array element by element", "Searches for an element in the array", "Sorts elements"], correct: 1, explanation: ".map() creates a new array applying a function to each element. [1,2,3].map(n => n*2) returns [2,4,6].", difficulty: 1, topicTags:["js","arrays"] },
      { q: "What is an object in JavaScript?", answers: ["A special file", "A collection of key-value pairs in curly braces {}", "A type of array", "A numeric variable"], correct: 1, explanation: "An object groups data as properties: const user = { name: 'Alice', age: 25 }. Access with user.name or user['name'].", difficulty: 1, topicTags:["js","objects"] },
      { q: "How do you convert the string '42' to a number?", answers: ["string.toNumber('42')", "Number('42') or parseInt('42')", "'42'.convert()", "int('42')"], correct: 1, explanation: "Number('42') returns 42. parseInt('42') too. +'42' is a shortcut using the unary + operator.", difficulty: 1, topicTags:["js","types"] },
      { q: "What does console.log(typeof null) print?", answers: ["'null'", "'undefined'", "'object'", "'nothing'"], correct: 2, explanation: "Historical JS bug: typeof null returns 'object'. This behavior exists since JS version 1 and cannot be fixed without breaking existing code.", difficulty: 2, topicTags:["js","types","quirks"] },
    ],
  },
  flexbox: {
    theory: "Flexbox is a CSS layout system designed to align elements in a row or column. To activate it, write display: flex on a container — its direct children become 'flex items'. The main axis is horizontal by default (flex-direction: row). justify-content manages alignment on this axis, align-items on the perpendicular axis. Ideal for navigation bars, cards, and forms.",
    questions: [
      { q: "Which property activates Flexbox on a container?", answers: ["flex: 1", "display: flex", "flex-container: true", "layout: flex"], correct: 1, explanation: "display: flex transforms the container into a 'flex container'. Direct children automatically become 'flex items'.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What does justify-content: center do?", answers: ["Centers text", "Centers flex items on the main axis", "Centers items on the perpendicular axis", "Centers the container on the page"], correct: 1, explanation: "justify-content manages alignment on the main axis (horizontal by default). center groups all items in the middle.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What does align-items: center do?", answers: ["Centers text inside items", "Centers items on the main axis", "Centers items on the perpendicular axis", "Centers the container"], correct: 2, explanation: "align-items aligns flex items on the perpendicular axis. With flex-direction: row, this is vertical alignment.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "Which property changes the direction of flex items?", answers: ["flex-align", "axis-direction", "flex-direction", "flex-flow-direction"], correct: 2, explanation: "flex-direction defines the main axis: row (horizontal, default), column (vertical), row-reverse, column-reverse.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What does flex: 1 do on a flex item?", answers: ["Gives item 1px width", "Allows item to grow to fill available space", "Places item first", "Duplicates item"], correct: 1, explanation: "flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0. The item expands to take available space.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What does justify-content: space-between do?", answers: ["Adds space inside items", "First item at start, last at end, equal space between", "Centers items with space around", "Aligns items vertically"], correct: 1, explanation: "space-between places first item at start, last at end. Remaining space distributed equally between items.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "How do you prevent flex items from wrapping?", answers: ["flex-wrap: no-wrap", "flex-wrap: nowrap", "flex-overflow: hidden", "wrap: false"], correct: 1, explanation: "flex-wrap: nowrap (default) — items stay on one line and shrink if necessary. flex-wrap: wrap allows line breaks.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What does align-self do on a flex item?", answers: ["Aligns text inside item", "Overrides align-items for this specific item", "Defines item size", "Aligns all items"], correct: 1, explanation: "align-self allows an individual item to ignore the container's align-items rule and align differently.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What is the default main axis with Flexbox?", answers: ["Vertical (column)", "Diagonal", "Horizontal (row)", "Circular"], correct: 2, explanation: "By default, flex-direction is 'row', so the main axis is horizontal. justify-content controls horizontal alignment.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What does flex-grow: 0 do?", answers: ["The item does not grow to fill free space", "The item disappears", "The item takes all space", "The item does not shrink"], correct: 0, explanation: "flex-grow: 0 (default) means the item does not grow to occupy available space. It keeps its natural size.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "Which shorthand absolutely centers an element (vertical + horizontal)?", answers: ["display: flex; center: all", "display: flex; place-items: center", "display: flex; justify: center; align: center", "display: flex; justify-content: center; align-items: center"], correct: 3, explanation: "justify-content: center + align-items: center centers items on both axes. Simplest technique to center anything.", difficulty: 1, topicTags:["css","flexbox","centering"] },
      { q: "What does flex-direction: column do?", answers: ["Displays items right to left", "Displays items bottom to top", "Displays items top to bottom (in a column)", "Displays items diagonally"], correct: 2, explanation: "column changes the main axis to vertical. Items stack top to bottom. justify-content then controls vertical alignment.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "What does flex-wrap: wrap do?", answers: ["Wraps the container in a border", "Allows items to move to multiple lines", "Removes spaces between items", "Reverses item order"], correct: 1, explanation: "flex-wrap: wrap allows flex items to move to the next line when there is no more space.", difficulty: 1, topicTags:["css","flexbox"] },
      { q: "Which property changes the visual order of a flex item?", answers: ["position", "z-index", "order", "flex-order"], correct: 2, explanation: "The 'order' property changes display order without modifying HTML. Default is 0 for all items.", difficulty: 2, topicTags:["css","flexbox"] },
      { q: "What is the difference between justify-content and align-items?", answers: ["They do the same thing", "justify-content is for main axis, align-items for cross axis", "align-items only works with grid", "justify-content is deprecated"], correct: 1, explanation: "justify-content: main axis (horizontal by default). align-items: cross axis (vertical by default). Both center when set to 'center'.", difficulty: 1, topicTags:["css","flexbox"] },
    ],
  },
  git: {
    theory: "Git records the complete history of changes to a project. Each 'commit' is a snapshot of the project at a given moment. Branches allow working on a feature without touching the main code. Typical workflow: modify files, add them to the 'staging area' with git add, then create a commit with git commit. git push sends commits to a remote repository like GitHub.",
    questions: [
      { q: "Which command initializes a new Git repository?", answers: ["git start", "git create", "git init", "git new"], correct: 2, explanation: "git init creates a Git repository in the current folder — a .git folder is created. git clone URL copies an existing remote repository.", difficulty: 1, topicTags:["git","basics"] },
      { q: "Which command prepares files for the next commit?", answers: ["git commit file.txt", "git stage file.txt", "git add file.txt", "git save file.txt"], correct: 2, explanation: "git add places files in the 'staging area' (index). Only staged files will be included in the next commit.", difficulty: 1, topicTags:["git","basics"] },
      { q: "How do you create a commit with a message?", answers: ["git save -m 'message'", "git commit -m 'message'", "git push -m 'message'", "git snapshot 'message'"], correct: 1, explanation: "git commit -m 'message' creates a commit with staged files. A good commit message describes what changed and why.", difficulty: 1, topicTags:["git","commits"] },
      { q: "What does git push do?", answers: ["Downloads remote commits", "Sends your local commits to the remote repository", "Merges branches", "Creates a new repository"], correct: 1, explanation: "git push sends local commits to the remote repository (GitHub, GitLab…). Colleagues can then fetch your changes with git pull.", difficulty: 1, topicTags:["git","remote"] },
      { q: "What does git pull do?", answers: ["Sends commits to the server", "Fetches and merges changes from the remote", "Creates a new branch", "Downloads without merging"], correct: 1, explanation: "git pull = git fetch + git merge. It retrieves new commits from the remote and merges them into your local branch.", difficulty: 1, topicTags:["git","remote"] },
      { q: "How do you create and switch to a new branch?", answers: ["git create new-feature", "git branch new-feature", "git checkout -b new-feature", "git switch --create new-feature"], correct: 2, explanation: "git checkout -b name creates the branch AND switches to it immediately. Modern: git switch -c name.", difficulty: 1, topicTags:["git","branches"] },
      { q: "What does git status show?", answers: ["Project statistics", "Modified, staged, and untracked files", "All commits", "Network status"], correct: 1, explanation: "git status shows which files were modified, which are in staging, and which are not yet tracked. Use it constantly.", difficulty: 1, topicTags:["git","basics"] },
      { q: "How do you view commit history?", answers: ["git history", "git show", "git log", "git commits"], correct: 2, explanation: "git log displays commit history with hashes, authors, dates, and messages. git log --oneline is more compact.", difficulty: 1, topicTags:["git","history"] },
      { q: "What does git stash do?", answers: ["Deletes uncommitted changes", "Temporarily saves changes to restore later", "Creates an automatic commit", "Archives the project"], correct: 1, explanation: "git stash sets aside uncommitted changes to 'clean' the working directory. git stash pop restores them.", difficulty: 1, topicTags:["git","stash"] },
      { q: "What is the conventional main branch name in Git?", answers: ["dev", "production", "master or main", "root"], correct: 2, explanation: "Historically 'master', GitHub and others switched to 'main' by default since 2020. Both are valid.", difficulty: 1, topicTags:["git","branches"] },
      { q: "What does git merge my-branch do?", answers: ["Deletes the branch", "Merges my-branch into the current branch", "Renames the branch", "Copies commits without merging"], correct: 1, explanation: "git merge merges a branch into the current branch. If the same lines were modified in both branches, a conflict occurs.", difficulty: 1, topicTags:["git","merging"] },
      { q: "How do you undo uncommitted changes to a file?", answers: ["git undo file.txt", "git reset --hard file.txt", "git checkout -- file.txt", "git restore file.txt"], correct: 3, explanation: "git restore file.txt (modern) or git checkout -- file.txt restores the file to its last commit state.", difficulty: 2, topicTags:["git","undo"] },
      { q: "What is a Git conflict?", answers: ["A network error with GitHub", "Two branches modifying the same code lines", "An invalid commit", "A corrupted branch"], correct: 1, explanation: "A conflict occurs when two branches modified the same lines. Git marks conflicts and humans must choose which version to keep.", difficulty: 1, topicTags:["git","conflicts"] },
      { q: "What does git clone URL do?", answers: ["Creates a new empty repo", "Copies a remote repository locally", "Downloads only the latest commit", "Links two repositories"], correct: 1, explanation: "git clone creates a local copy of a remote repository with full history and remote tracking.", difficulty: 1, topicTags:["git","remote"] },
      { q: "What is the difference between git fetch and git pull?", answers: ["No difference", "git fetch downloads without merging; git pull downloads and merges", "git fetch is faster", "git pull is for branches only"], correct: 1, explanation: "git fetch downloads remote changes without modifying your working directory. git pull = fetch + merge.", difficulty: 2, topicTags:["git","remote"] },
    ],
  },
  react: {
    theory: "React is a JavaScript library for building interfaces. Core idea: the interface is a function of data. A React component is a function that returns JSX (HTML in JavaScript). useState() remembers data that changes — when state changes, React automatically re-renders the component. useEffect() runs code in response to changes (loading, data updates).",
    questions: [
      { q: "What is JSX in React?", answers: ["A new programming language", "A syntax that mixes JavaScript and HTML", "A configuration file", "A type of component"], correct: 1, explanation: "JSX allows writing HTML directly in JavaScript. Babel transforms it into React.createElement() calls. Very readable.", difficulty: 1, topicTags:["react","jsx"] },
      { q: "How do you create a functional React component?", answers: ["class MyComp extends Component {}", "const MyComp = () => <div>Hello</div>;", "function: MyComp => <div>Hello</div>", "React.make('MyComp', <div/>)"], correct: 1, explanation: "A functional component is a function (classic or arrow) that returns JSX. Components must start with uppercase.", difficulty: 1, topicTags:["react","components"] },
      { q: "What is the useState hook for?", answers: ["Making network requests", "Remembering a value that can change and trigger a re-render", "Sharing data between components", "Managing side effects"], correct: 1, explanation: "useState returns a value and a function to update it. Calling the update function re-renders the component.", difficulty: 1, topicTags:["react","hooks","state"] },
      { q: "What does useState(0) return?", answers: ["The value 0", "[currentValue, updateFunction]", "{value: 0, update: fn}", "A State object"], correct: 1, explanation: "useState returns an array of two elements: the current value and a setter function. Destructure: const [count, setCount] = useState(0).", difficulty: 1, topicTags:["react","hooks","state"] },
      { q: "How do you pass data to a child component?", answers: ["Via global variables", "Via props (properties)", "Via localStorage", "Via shared useState"], correct: 1, explanation: "Props are attributes passed to a component: <MyComp name='Alice' age={25} />. Received as parameter: function MyComp({ name, age }) {...}.", difficulty: 1, topicTags:["react","props"] },
      { q: "When do you use useEffect?", answers: ["To create animations", "To execute code in response to renders or data changes", "To replace useState", "To manage forms"], correct: 1, explanation: "useEffect runs after each render. Dependency array controls when: [] once on mount, [variable] on each variable change.", difficulty: 1, topicTags:["react","hooks","effects"] },
      { q: "What does [] mean in useEffect(() => {}, [])?", answers: ["Effect never runs", "Effect runs on every render", "Effect runs once on component mount", "Effect only runs on unmount"], correct: 2, explanation: "[] (empty array) means 'no dependencies' — the effect runs only once when the component mounts.", difficulty: 1, topicTags:["react","hooks","effects"] },
      { q: "How do you render a list in React?", answers: ["<for> item in items </for>", "{items.forEach(item => <li>{item}</li>)}", "{items.map(item => <li key={item.id}>{item.name}</li>)}", "<List items={items} />"], correct: 2, explanation: ".map() returns an array of JSX. The 'key' prop is required on each list element — React uses it to optimize updates.", difficulty: 1, topicTags:["react","lists"] },
      { q: "What is rule #1 of React hooks?", answers: ["Always import from 'react'", "Call only at the top level, not inside if/for", "Name them with lowercase 'use'", "Use each only once per component"], correct: 1, explanation: "Hooks must be called in the same order on every render. Cannot be in conditions, loops, or nested functions.", difficulty: 1, topicTags:["react","hooks","rules"] },
      { q: "How do you prevent an unnecessary child component re-render?", answers: ["useCallback()", "useState(false)", "React.memo()", "useRef()"], correct: 2, explanation: "React.memo() memoizes a component: it only re-renders if its props change.", difficulty: 2, topicTags:["react","performance"] },
      { q: "What does the useRef hook do?", answers: ["Re-renders when value changes", "Creates a mutable ref that persists without causing re-renders", "References state from another component", "Automatically fetches data"], correct: 1, explanation: "useRef creates {current: value} that persists between renders. Modifying .current does NOT trigger re-render.", difficulty: 2, topicTags:["react","hooks","refs"] },
      { q: "How do you update an object in React state?", answers: ["state.prop = newValue", "setState.push(newValue)", "setObj({ ...obj, prop: newValue })", "obj.update(prop, newValue)"], correct: 2, explanation: "Never mutate state directly. Create a new object with spread: { ...obj, prop: newValue }.", difficulty: 1, topicTags:["react","state"] },
      { q: "What is the React Context API?", answers: ["A tool for making API requests", "A system to share data without prop drilling", "An alternative to hooks", "An external state manager"], correct: 1, explanation: "Context API allows sharing data (theme, language, user) accessible throughout the component tree, without passing props manually.", difficulty: 2, topicTags:["react","context"] },
      { q: "What does 'prop drilling' mean?", answers: ["An optimization technique", "Passing props through multiple intermediate components that don't need them", "A type of React bug", "Accessing parent component props"], correct: 1, explanation: "Prop drilling is passing a prop through a long chain of intermediate components. Context, Redux, or Zustand solve this.", difficulty: 2, topicTags:["react","props","patterns"] },
      { q: "What does the key prop do in React lists?", answers: ["Styles the element", "Helps React identify which items changed for efficient updates", "Makes elements clickable", "Assigns a CSS id"], correct: 1, explanation: "key helps React's reconciliation algorithm identify which items changed, were added, or removed. Must be unique and stable.", difficulty: 1, topicTags:["react","lists","performance"] },
    ],
  },
  generic: {
    theory: "Software development relies on principles that transcend languages: writing readable code, testing it, documenting it, and maintaining it. The DRY principle (Don't Repeat Yourself) avoids duplication. KISS (Keep It Simple, Stupid) prefers simplicity. Unit tests verify that each function does what it should. Code review improves collective quality.",
    questions: [
      { q: "What does DRY stand in programming?", answers: ["Don't Run Yourself", "Don't Repeat Yourself", "Do Refactor Yearly", "Debug, Review, Yield"], correct: 1, explanation: "DRY: each piece of logic should exist in only one place. Duplication makes maintenance difficult.", difficulty: 1, topicTags:["principles"] },
      { q: "What is a unit test?", answers: ["A user interface test", "A test of a single module or function in isolation", "A load test", "A manual test"], correct: 1, explanation: "A unit test verifies that an individual function does what is expected. Dependencies are mocked. Fast and automated.", difficulty: 1, topicTags:["testing"] },
      { q: "What does 'refactoring' mean?", answers: ["Rewriting the app from scratch", "Improving code structure without changing its behavior", "Fixing bugs", "Adding new features"], correct: 1, explanation: "Refactoring improves readability or structure of existing code without changing what it does. Tests must still pass.", difficulty: 1, topicTags:["principles"] },
      { q: "What is a REST API?", answers: ["A database protocol", "A JavaScript framework", "Conventions for creating web services via HTTP", "A query language"], correct: 2, explanation: "REST uses HTTP methods (GET read, POST create, PUT modify, DELETE remove) and clear URLs to identify resources.", difficulty: 1, topicTags:["api","rest"] },
      { q: "What does the KISS principle mean?", answers: ["Keep It Simple, Stupid", "Kill Invalid Slow Software", "Keep Implementing Safe Syntax", "Know It's Syntax Sugar"], correct: 0, explanation: "KISS: the simplest solution that works is often the best. Complexity is the main enemy of maintainability.", difficulty: 1, topicTags:["principles"] },
      { q: "What is semantic versioning (semver)?", answers: ["Git was created by Linus Torvalds", "A MAJOR.MINOR.PATCH numbering system for software", "A version management tool", "A commit convention"], correct: 1, explanation: "Semver: 2.3.1 = MAJOR.MINOR.PATCH. MAJOR for breaking changes, MINOR for new features, PATCH for bug fixes.", difficulty: 1, topicTags:["versioning"] },
      { q: "What is technical debt?", answers: ["The cost of a software license", "Accumulated work due to quick but imperfect development choices", "The number of uncorrected bugs", "Hosting costs"], correct: 1, explanation: "Technical debt is like financial debt: shortcuts today create 'interest' to pay later — hard-to-maintain code.", difficulty: 1, topicTags:["principles"] },
      { q: "What is continuous integration (CI)?", answers: ["Integrating external APIs", "Automating tests and verifications on each code change", "Manually merging branches", "Automatically deploying to production"], correct: 1, explanation: "CI: on each push, an automated system runs tests, checks code, and reports issues. GitHub Actions is a CI tool.", difficulty: 1, topicTags:["devops","ci"] },
      { q: "What does 'open source' mean?", answers: ["The software is free", "The source code is public and can be read, modified, and redistributed", "The software runs in the cloud", "The software has no license"], correct: 1, explanation: "Open source means the code is publicly available. Anyone can read, modify, contribute according to the license.", difficulty: 1, topicTags:["principles"] },
      { q: "What is debugging?", answers: ["Writing comments in code", "Finding and fixing the cause of a bug", "Deleting unused code", "Manually testing the application"], correct: 1, explanation: "Debugging: reproduce the problem, isolate the cause, understand why it happens, fix and verify. Tools: console.log, browser debugger.", difficulty: 1, topicTags:["debugging"] },
      { q: "What is the difference between a bug and a feature?", answers: ["No difference", "A bug is unintentional behavior; a feature is intended functionality", "Bugs are harder to fix", "Features are free, bugs cost money"], correct: 1, explanation: "A bug is incorrect or unexpected program behavior. A feature is intentionally added functionality.", difficulty: 1, topicTags:["principles"] },
      { q: "What is version control?", answers: ["Counting software updates", "A system that tracks changes to files over time", "Backing up only the latest version", "Numbering releases"], correct: 1, explanation: "Version control (like Git) records the history of file changes, allowing collaboration, rollbacks, and branching.", difficulty: 1, topicTags:["versioning","git"] },
    ],
  },
};

const MOCK_DB_ES = {
  html: {
    theory: "HTML (HyperText Markup Language) es el lenguaje de marcado que estructura el contenido web. Cada elemento HTML se define con etiquetas de apertura y cierre, como p para un párrafo o h1 para el título principal. La semántica HTML permite a los navegadores y motores de búsqueda entender el significado del contenido: article, nav y section son etiquetas semánticas HTML5. Un documento bien estructurado siempre comienza con DOCTYPE html, seguido de html, head y body.",
    questions: [
      { q: "¿Qué etiqueta HTML representa el título más importante?", answers: ["h6", "title", "h1", "header"], correct: 2, explanation: "h1 es el título de nivel 1, el más importante jerárquicamente. Los motores de búsqueda le dan un peso SEO significativo.", difficulty: 1, topicTags:["html","semantica"] },
      { q: "¿Qué etiqueta se usa para crear un hipervínculo?", answers: ["link", "a", "href", "url"], correct: 1, explanation: "La etiqueta 'a' (ancla) crea enlaces. El atributo href define el destino.", difficulty: 1, topicTags:["html","enlaces"] },
      { q: "¿Cómo insertar una imagen en HTML?", answers: ["image src=''", "img src=''", "img href=''", "picture src=''"], correct: 1, explanation: "img es una etiqueta de cierre automático. src apunta al archivo y alt proporciona una descripción accesible.", difficulty: 1, topicTags:["html","media"] },
      { q: "¿Qué atributo hace obligatorio un campo de formulario?", answers: ["mandatory", "required", "validate", "must"], correct: 1, explanation: "'required' impide el envío si el campo está vacío. Es validación HTML nativa, sin JavaScript.", difficulty: 1, topicTags:["html","formularios"] },
      { q: "¿Qué elemento HTML5 es más apropiado para el contenido principal?", answers: ["div.main", "section", "main", "content"], correct: 2, explanation: "main indica el contenido principal único de la página y ayuda a las tecnologías de asistencia.", difficulty: 1, topicTags:["html","semantica"] },
      { q: "¿Cuál es la diferencia entre div y span?", answers: ["Ninguna diferencia", "div es bloque, span es en línea", "span es bloque, div es en línea", "div está obsoleto"], correct: 1, explanation: "div es un elemento de bloque que ocupa todo el ancho. span es en línea y no crea salto de línea.", difficulty: 1, topicTags:["html","estructura"] },
      { q: "¿Qué etiqueta es semánticamente correcta para la navegación principal?", answers: ["div#nav", "navigation", "nav", "menu"], correct: 2, explanation: "nav es la etiqueta semántica HTML5 dedicada a la navegación principal.", difficulty: 1, topicTags:["html","semantica"] },
      { q: "¿Cómo crear una lista no ordenada en HTML?", answers: ["ol + li", "ul + li", "list + item", "nl + li"], correct: 1, explanation: "ul (unordered list) crea una lista de puntos. Cada elemento está en una etiqueta li.", difficulty: 1, topicTags:["html","listas"] },
      { q: "¿Qué hace el atributo alt en una etiqueta img?", answers: ["Establece el título", "Proporciona descripción textual para accesibilidad", "Enlaza a otra imagen", "Define el tamaño"], correct: 1, explanation: "El texto alt es leído por lectores de pantalla y se muestra cuando la imagen no carga. Esencial para accesibilidad.", difficulty: 1, topicTags:["html","accesibilidad"] },
      { q: "¿Cuál es el propósito de la declaración doctype?", answers: ["Define la versión CSS", "Indica al navegador que es un documento HTML", "Carga un archivo JavaScript", "Establece el título de la página"], correct: 1, explanation: "<!DOCTYPE html> indica al navegador que renderice en modo estándar. Sin él, puede activarse el modo quirks.", difficulty: 1, topicTags:["html","estructura"] },
      { q: "¿Qué etiqueta crea una fila de tabla?", answers: ["td", "th", "tr", "row"], correct: 2, explanation: "tr (table row) envuelve una fila de celdas. td contiene celdas de datos, th contiene celdas de encabezado.", difficulty: 1, topicTags:["html","tablas"] },
      { q: "¿Qué tipo de input valida automáticamente el formato de email?", answers: ["type='mail'", "type='email'", "type='contact'", "type='text'"], correct: 1, explanation: "type='email' realiza validación nativa del formato email. El navegador muestra error si el formato es inválido.", difficulty: 1, topicTags:["html","formularios"] },
      { q: "¿Qué hace el atributo for de un label?", answers: ["Nombra el label", "Asocia label con input por id", "Establece el color del label", "Posiciona el label"], correct: 1, explanation: "for='input-id' asocia el label con el input. Al hacer clic en el label se enfoca el input, mejorando la usabilidad.", difficulty: 2, topicTags:["html","accesibilidad","formularios"] },
      { q: "¿Qué atributo especifica a dónde envía datos un formulario?", answers: ["method", "action", "target", "send"], correct: 1, explanation: "El atributo action define la URL donde se envían los datos del formulario.", difficulty: 2, topicTags:["html","formularios"] },
      { q: "¿Cuál etiqueta agrupa campos de formulario relacionados?", answers: ["group", "fieldset", "section", "form-group"], correct: 1, explanation: "fieldset agrupa controles relacionados. legend le da un título descriptivo. Mejora la accesibilidad.", difficulty: 2, topicTags:["html","formularios","accesibilidad"] },
    ],
  },
  css: {
    theory: "CSS (Cascading Style Sheets) controla la apariencia visual de los elementos HTML. Las reglas CSS siguen la sintaxis: selector { propiedad: valor; }. La cascada determina qué regla se aplica en caso de conflicto, según la especificidad del selector y el orden de aparición. Los selectores van del más general (etiqueta) al más específico (id), con las clases en medio.",
    questions: [
      { q: "¿Qué propiedad CSS cambia el color del texto?", answers: ["font-color", "text-color", "color", "foreground"], correct: 2, explanation: "La propiedad 'color' define el color del texto. Acepta valores en nombre, hexadecimal, RGB o HSL.", difficulty: 1, topicTags:["css","colores"] },
      { q: "¿Qué selector CSS tiene la mayor especificidad?", answers: [".clase", "etiqueta", "#id", "* (universal)"], correct: 2, explanation: "Los selectores de id (#id) tienen mayor especificidad que las clases y etiquetas.", difficulty: 1, topicTags:["css","especificidad"] },
      { q: "¿Qué propiedad CSS crea espaciado interno en un elemento?", answers: ["margin", "padding", "border", "spacing"], correct: 1, explanation: "El padding es el espacio entre el contenido y el borde. El margin es el espacio exterior.", difficulty: 1, topicTags:["css","box-model"] },
      { q: "¿Qué hace box-sizing: border-box?", answers: ["Añade un borde automático", "Incluye padding y borde en el ancho total", "Elimina el modelo de caja", "Centra el elemento"], correct: 1, explanation: "Con border-box, width: 200px ya incluye padding y borde. Sin él, se suman al ancho declarado.", difficulty: 1, topicTags:["css","box-model"] },
      { q: "¿Qué unidad CSS es relativa al tamaño de fuente del elemento padre?", answers: ["px", "em", "rem", "vh"], correct: 1, explanation: "em es relativo al font-size del padre. rem es relativo al elemento raíz, más predecible.", difficulty: 1, topicTags:["css","unidades"] },
      { q: "¿Cómo aplicar estilo solo al primer hijo?", answers: [".first-child", ":first-child", "::first-child", "#first"], correct: 1, explanation: ":first-child es una pseudo-clase que apunta al primer hijo. :nth-child(1) es equivalente.", difficulty: 1, topicTags:["css","selectores"] },
      { q: "¿Qué valor de posición saca al elemento del flujo normal?", answers: ["relative", "static", "absolute", "inherit"], correct: 2, explanation: "absolute y fixed sacan al elemento del flujo. absolute se posiciona respecto al padre posicionado más cercano.", difficulty: 1, topicTags:["css","posicionamiento"] },
      { q: "¿Cómo centrar horizontalmente un bloque con CSS moderno?", answers: ["text-align: center", "margin: auto", "display: flex + justify-content: center", "position: center"], correct: 2, explanation: "En un contenedor flex, justify-content: center alinea los hijos en el centro del eje principal.", difficulty: 1, topicTags:["css","layout"] },
      { q: "¿Qué hace transition en CSS?", answers: ["Crea animaciones complejas", "Anima suavemente cambios de propiedades", "Transforma elementos", "Solo funciona con hover"], correct: 1, explanation: "transition: propiedad duración efecto hace que los cambios de propiedad CSS se animen suavemente.", difficulty: 1, topicTags:["css","animaciones"] },
      { q: "¿Qué controla z-index?", answers: ["Nivel de zoom", "Orden de apilamiento en el eje z", "Tamaño del elemento", "Opacidad"], correct: 1, explanation: "z-index controla qué elemento aparece encima cuando se superponen. Mayor z-index = arriba. Solo funciona en elementos posicionados.", difficulty: 1, topicTags:["css","posicionamiento"] },
      { q: "¿Qué es una propiedad personalizada CSS (variable)?", answers: ["Una clase que cambia valor", "--nombre: valor; accesible con var(--nombre)", "Una variable JavaScript", "Una variable Sass"], correct: 1, explanation: "Variables CSS: --primary: #3b82f6; usadas con var(--primary). Heredan y se pueden sobreescribir en cualquier ámbito.", difficulty: 2, topicTags:["css","variables"] },
      { q: "¿Qué hace opacity: 0 comparado con visibility: hidden?", answers: ["Son idénticos", "opacity: 0 oculta visualmente pero mantiene espacio y es clickeable", "visibility: hidden elimina del layout", "opacity: 0 elimina el elemento"], correct: 1, explanation: "Ambos ocultan visualmente. opacity: 0 sigue recibiendo eventos. visibility: hidden no. display: none elimina del flujo.", difficulty: 2, topicTags:["css","visibilidad"] },
      { q: "¿Cuál es la diferencia entre rem y em?", answers: ["Sin diferencia", "rem es relativo al font-size raíz; em es relativo al padre", "em siempre es 16px", "rem solo para fuentes"], correct: 1, explanation: "rem: siempre relativo al font-size de <html>, predecible. em: relativo al padre, puede acumularse.", difficulty: 2, topicTags:["css","unidades"] },
      { q: "¿Qué hace display: none?", answers: ["Hace el elemento transparente", "Elimina el elemento del layout (sin espacio)", "Oculta pero mantiene espacio", "Invisible pero interactivo"], correct: 1, explanation: "display: none elimina el elemento del flujo del documento — no ocupa espacio y no puede interactuarse.", difficulty: 1, topicTags:["css","display"] },
      { q: "¿Cómo centrar un elemento vertical y horizontalmente con flexbox?", answers: ["display: flex; center: all", "display: flex; place-items: center", "display: flex; justify: center; align: center", "display: flex; justify-content: center; align-items: center"], correct: 3, explanation: "justify-content: center + align-items: center centra en ambos ejes. La técnica más simple para centrar cualquier cosa.", difficulty: 1, topicTags:["css","flexbox","centrado"] },
    ],
  },
  javascript: {
    theory: "JavaScript es el lenguaje de programación de la web. Permite hacer páginas interactivas. Una variable almacena un valor — declarada con let (modificable) o const (constante). JavaScript tiene varios tipos de datos: strings, números, booleanos (true/false), arrays y objetos. Una función agrupa instrucciones reutilizables.",
    questions: [
      { q: "¿Cómo declarar una variable que no cambiará en JavaScript?", answers: ["var", "let", "const", "static"], correct: 2, explanation: "const declara una constante: su valor no puede reasignarse. Usar const por defecto.", difficulty: 1, topicTags:["js","variables"] },
      { q: "¿Qué tipo devuelve typeof 'hola'?", answers: ["'text'", "'string'", "'word'", "'char'"], correct: 1, explanation: "typeof devuelve el tipo de un valor. typeof 'hola' devuelve 'string'.", difficulty: 1, topicTags:["js","tipos"] },
      { q: "¿Cómo mostrar texto en la consola del navegador?", answers: ["print('texto')", "console.log('texto')", "log('texto')", "display('texto')"], correct: 1, explanation: "console.log() imprime un mensaje en la consola de herramientas de desarrollo. Herramienta básica de depuración.", difficulty: 1, topicTags:["js","depuracion"] },
      { q: "¿Cuál es el valor de 5 + '3' en JavaScript?", answers: ["8", "'53'", "Error", "NaN"], correct: 1, explanation: "Al sumar número y string, JS convierte el número a texto y concatena. 5 + '3' da '53'.", difficulty: 1, topicTags:["js","tipos","coercion"] },
      { q: "¿Cómo crear un array en JavaScript?", answers: ["let arr = (1, 2, 3)", "let arr = {1, 2, 3}", "let arr = [1, 2, 3]", "let arr = <1, 2, 3>"], correct: 2, explanation: "Arrays usan corchetes []. let frutas = ['manzana', 'banana']. Acceso por índice que empieza en 0.", difficulty: 1, topicTags:["js","arrays"] },
      { q: "¿Cómo escribir una condición if...else en JavaScript?", answers: ["when...otherwise", "if...else", "check...default", "test...fallback"], correct: 1, explanation: "if...else es la estructura condicional básica. if (condición) { ... } else { ... }.", difficulty: 1, topicTags:["js","control-flujo"] },
      { q: "¿Qué método añade un elemento al final de un array?", answers: ["array.add()", "array.append()", "array.push()", "array.insert()"], correct: 2, explanation: "push() añade uno o más elementos al final. pop() elimina y devuelve el último.", difficulty: 1, topicTags:["js","arrays"] },
      { q: "¿Cómo escribir un bucle que se repite 5 veces?", answers: ["repeat(5) { }", "loop 5 times { }", "for (let i = 0; i < 5; i++) { }", "while i < 5 { }"], correct: 2, explanation: "El bucle for clásico: inicialización, condición e incremento. Se repite mientras la condición sea verdadera.", difficulty: 1, topicTags:["js","bucles"] },
      { q: "¿Qué devuelve 'hola'.length?", answers: ["4", "'hola'", "5", "undefined"], correct: 0, explanation: "La propiedad .length da el número de caracteres de una cadena. 'hola' tiene 4 caracteres.", difficulty: 1, topicTags:["js","strings"] },
      { q: "¿Cómo verificar igualdad estricta en JavaScript?", answers: ["=", "==", "===", "equals()"], correct: 2, explanation: "=== (triple igual) verifica valor Y tipo. 5 === '5' es false. == convierte tipos antes de comparar.", difficulty: 1, topicTags:["js","operadores"] },
      { q: "¿Qué es una función flecha (arrow function)?", answers: ["Una función con flecha en el nombre", "Sintaxis corta: () => {}", "Una función que apunta a un elemento DOM", "Una función anónima clásica"], correct: 1, explanation: "Arrow functions (ES6): const doble = (n) => n * 2; más corta que function doble(n) { return n * 2; }. Sin propio 'this'.", difficulty: 1, topicTags:["js","funciones"] },
      { q: "¿Qué hace el método .map() en un array?", answers: ["Dibuja un mapa", "Devuelve un nuevo array transformado elemento por elemento", "Busca un elemento", "Ordena elementos"], correct: 1, explanation: ".map() crea un nuevo array aplicando una función a cada elemento. [1,2,3].map(n => n*2) devuelve [2,4,6].", difficulty: 1, topicTags:["js","arrays"] },
      { q: "¿Qué es un objeto en JavaScript?", answers: ["Un archivo especial", "Una colección de pares clave-valor entre llaves {}", "Un tipo de array", "Una variable numérica"], correct: 1, explanation: "Un objeto agrupa datos como propiedades: const user = { nombre: 'Ana', edad: 25 }. Acceso con user.nombre.", difficulty: 1, topicTags:["js","objetos"] },
      { q: "¿Cómo convertir el string '42' a número?", answers: ["string.toNumber('42')", "Number('42') o parseInt('42')", "'42'.convert()", "int('42')"], correct: 1, explanation: "Number('42') devuelve 42. parseInt('42') también. +'42' es un atajo con el operador unario +.", difficulty: 1, topicTags:["js","tipos"] },
      { q: "¿Qué imprime console.log(typeof null)?", answers: ["'null'", "'undefined'", "'object'", "'nothing'"], correct: 2, explanation: "Bug histórico de JS: typeof null devuelve 'object'. Existe desde la versión 1 de JS y no puede corregirse.", difficulty: 2, topicTags:["js","tipos","quirks"] },
    ],
  },
  react: {
    theory: "React es una biblioteca JavaScript para construir interfaces. Idea central: la interfaz es una función de los datos. Un componente React es una función que retorna JSX (HTML en JavaScript). useState() recuerda datos que cambian — cuando el estado cambia, React re-renderiza automáticamente el componente. useEffect() ejecuta código en respuesta a cambios.",
    questions: [
      { q: "¿Qué es JSX en React?", answers: ["Un nuevo lenguaje de programación", "Una sintaxis que mezcla JavaScript y HTML", "Un archivo de configuración", "Un tipo de componente"], correct: 1, explanation: "JSX permite escribir HTML directamente en JavaScript. Babel lo transforma en llamadas React.createElement().", difficulty: 1, topicTags:["react","jsx"] },
      { q: "¿Cómo crear un componente React funcional?", answers: ["class MiComp extends Component {}", "const MiComp = () => <div>Hola</div>;", "function: MiComp => <div>Hola</div>", "React.make('MiComp', <div/>)"], correct: 1, explanation: "Un componente funcional es una función que retorna JSX. Los componentes deben empezar con mayúscula.", difficulty: 1, topicTags:["react","componentes"] },
      { q: "¿Para qué sirve el hook useState?", answers: ["Hacer peticiones de red", "Recordar un valor que puede cambiar y disparar re-renderizado", "Compartir datos entre componentes", "Gestionar efectos secundarios"], correct: 1, explanation: "useState devuelve un valor y una función para actualizarlo. Al llamar la función de actualización, React re-renderiza.", difficulty: 1, topicTags:["react","hooks","estado"] },
      { q: "¿Qué devuelve useState(0)?", answers: ["El valor 0", "[valorActual, funcionActualizar]", "{value: 0, update: fn}", "Un objeto State"], correct: 1, explanation: "useState devuelve un array de dos elementos: el valor actual y una función setter. Se desestructura: const [count, setCount] = useState(0).", difficulty: 1, topicTags:["react","hooks","estado"] },
      { q: "¿Cómo pasar datos a un componente hijo?", answers: ["Mediante variables globales", "Mediante props (propiedades)", "Mediante localStorage", "Mediante useState compartido"], correct: 1, explanation: "Las props son atributos pasados al componente: <MiComp nombre='Ana' edad={25} />. Se reciben como parámetro.", difficulty: 1, topicTags:["react","props"] },
      { q: "¿Cuándo usar useEffect?", answers: ["Para crear animaciones", "Para ejecutar código en respuesta a renders o cambios de datos", "Para reemplazar useState", "Para gestionar formularios"], correct: 1, explanation: "useEffect ejecuta tras cada render. El array de dependencias controla cuándo: [] una vez al montar, [variable] cada cambio.", difficulty: 1, topicTags:["react","hooks","efectos"] },
      { q: "¿Qué significa [] en useEffect(() => {}, [])?", answers: ["El efecto nunca se ejecuta", "El efecto se ejecuta en cada render", "El efecto se ejecuta una vez al montar el componente", "Solo al desmontar"], correct: 2, explanation: "[] (array vacío) = 'sin dependencias' — el efecto se ejecuta solo una vez cuando el componente se monta.", difficulty: 1, topicTags:["react","hooks","efectos"] },
      { q: "¿Cómo renderizar una lista en React?", answers: ["<for> item in items </for>", "{items.forEach(item => <li>{item}</li>)}", "{items.map(item => <li key={item.id}>{item.name}</li>)}", "<List items={items} />"], correct: 2, explanation: ".map() devuelve un array de JSX. La prop 'key' es obligatoria en cada elemento — React la usa para optimizar actualizaciones.", difficulty: 1, topicTags:["react","listas"] },
      { q: "¿Cuál es la regla #1 de los hooks de React?", answers: ["Siempre importarlos desde 'react'", "Llamarlos solo en el nivel superior, nunca en if/for", "Nombrarlos con 'use' minúscula", "Usarlos una sola vez por componente"], correct: 1, explanation: "Los hooks deben llamarse en el mismo orden en cada render. No pueden estar en condiciones, bucles o funciones anidadas.", difficulty: 1, topicTags:["react","hooks","reglas"] },
      { q: "¿Cómo evitar re-renderizados innecesarios de un componente hijo?", answers: ["useCallback()", "useState(false)", "React.memo()", "useRef()"], correct: 2, explanation: "React.memo() memoiza un componente: solo se re-renderiza si sus props cambian.", difficulty: 2, topicTags:["react","rendimiento"] },
      { q: "¿Qué hace el hook useRef?", answers: ["Re-renderiza cuando cambia el valor", "Crea una referencia mutable que persiste sin causar re-renders", "Referencia estado de otro componente", "Hace fetch automáticamente"], correct: 1, explanation: "useRef crea {current: valor} que persiste entre renders. Modificar .current NO dispara re-renderizado.", difficulty: 2, topicTags:["react","hooks","refs"] },
      { q: "¿Cómo actualizar un objeto en el estado de React?", answers: ["state.prop = newValue", "setState.push(newValue)", "setObj({ ...obj, prop: newValue })", "obj.update(prop, newValue)"], correct: 2, explanation: "Nunca mutar el estado directamente. Crear nuevo objeto con spread: { ...obj, prop: newValue }.", difficulty: 1, topicTags:["react","estado"] },
      { q: "¿Qué es el Context API de React?", answers: ["Una herramienta para peticiones API", "Un sistema para compartir datos sin prop drilling", "Una alternativa a los hooks", "Un gestor de estado externo"], correct: 1, explanation: "Context API permite compartir datos (tema, idioma, usuario) accesibles en todo el árbol de componentes.", difficulty: 2, topicTags:["react","context"] },
      { q: "¿Qué significa 'prop drilling'?", answers: ["Una técnica de optimización", "Pasar props a través de múltiples componentes intermedios que no las necesitan", "Un tipo de bug de React", "Acceso a las props del padre"], correct: 1, explanation: "El prop drilling es el problema de pasar una prop a través de una larga cadena de componentes intermedios.", difficulty: 2, topicTags:["react","props","patrones"] },
      { q: "¿Qué hace la prop key en listas de React?", answers: ["Estiliza el elemento", "Ayuda a React a identificar qué elementos cambiaron para actualizaciones eficientes", "Hace elementos clickeables", "Asigna un id CSS"], correct: 1, explanation: "key ayuda al algoritmo de reconciliación de React a identificar qué elementos cambiaron. Debe ser único y estable.", difficulty: 1, topicTags:["react","listas","rendimiento"] },
    ],
  },
  generic: {
    theory: "El desarrollo de software se basa en principios que trascienden los lenguajes: escribir código legible, probarlo, documentarlo y mantenerlo. El principio DRY (Don't Repeat Yourself) evita la duplicación. KISS (Keep It Simple, Stupid) prefiere la simplicidad. Las pruebas unitarias verifican que cada función hace lo que debe. La revisión de código mejora la calidad colectiva.",
    questions: [
      { q: "¿Qué significa DRY en programación?", answers: ["Don't Run Yourself", "Don't Repeat Yourself", "Do Refactor Yearly", "Debug, Review, Yield"], correct: 1, explanation: "DRY: cada lógica debe existir en un solo lugar. La duplicación dificulta el mantenimiento.", difficulty: 1, topicTags:["principios"] },
      { q: "¿Qué es una prueba unitaria?", answers: ["Una prueba de la interfaz", "Una prueba de un módulo o función en aislamiento", "Una prueba de carga", "Una prueba manual"], correct: 1, explanation: "Una prueba unitaria verifica que una función individual haga lo esperado. Las dependencias se simulan (mocks).", difficulty: 1, topicTags:["testing"] },
      { q: "¿Qué significa 'refactorizar'?", answers: ["Reescribir la app desde cero", "Mejorar la estructura del código sin cambiar su comportamiento", "Corregir bugs", "Añadir nuevas funcionalidades"], correct: 1, explanation: "Refactorizar es mejorar la legibilidad o estructura del código existente sin cambiar lo que hace.", difficulty: 1, topicTags:["principios"] },
      { q: "¿Qué es una API REST?", answers: ["Un protocolo de base de datos", "Un framework JavaScript", "Convenciones para crear servicios web via HTTP", "Un lenguaje de consulta"], correct: 2, explanation: "REST usa métodos HTTP (GET leer, POST crear, PUT modificar, DELETE eliminar) y URLs claras para identificar recursos.", difficulty: 1, topicTags:["api","rest"] },
      { q: "¿Qué significa el principio KISS?", answers: ["Keep It Simple, Stupid", "Kill Invalid Slow Software", "Keep Implementing Safe Syntax", "Know It's Syntax Sugar"], correct: 0, explanation: "KISS: la solución más simple que funciona suele ser la mejor. La complejidad es el principal enemigo del mantenimiento.", difficulty: 1, topicTags:["principios"] },
      { q: "¿Qué es el versionado semántico (semver)?", answers: ["Git fue creado por Linus Torvalds", "Un sistema MAJOR.MINOR.PATCH para versiones de software", "Una herramienta de gestión de versiones", "Una convención de commits"], correct: 1, explanation: "Semver: 2.3.1 = MAJOR.MINOR.PATCH. MAJOR para cambios incompatibles, MINOR para nuevas funcionalidades, PATCH para correcciones.", difficulty: 1, topicTags:["versionado"] },
      { q: "¿Qué es la deuda técnica?", answers: ["El costo de una licencia de software", "Trabajo acumulado por elecciones de desarrollo rápidas pero imperfectas", "El número de bugs no corregidos", "Los costos de alojamiento"], correct: 1, explanation: "La deuda técnica es como una deuda financiera: atajos hoy crean 'intereses' a pagar después — código difícil de mantener.", difficulty: 1, topicTags:["principios"] },
      { q: "¿Qué es la integración continua (CI)?", answers: ["Integrar APIs externas", "Automatizar tests y verificaciones en cada cambio de código", "Fusionar ramas manualmente", "Desplegar automáticamente a producción"], correct: 1, explanation: "CI: en cada push, un sistema automatizado ejecuta tests, verifica el código y reporta problemas. GitHub Actions es una herramienta CI.", difficulty: 1, topicTags:["devops","ci"] },
      { q: "¿Qué significa 'open source'?", answers: ["El software es gratuito", "El código fuente es público y puede leerse, modificarse y redistribuirse", "El software corre en la nube", "El software no tiene licencia"], correct: 1, explanation: "Open source significa que el código está disponible públicamente. Cualquiera puede leer, modificar, contribuir según la licencia.", difficulty: 1, topicTags:["principios"] },
      { q: "¿Qué es la depuración (debugging)?", answers: ["Escribir comentarios", "Encontrar y corregir la causa de un bug", "Eliminar código inutilizado", "Probar manualmente la aplicación"], correct: 1, explanation: "Depurar: reproducir el problema, aislar la causa, entender por qué ocurre, corregir y verificar.", difficulty: 1, topicTags:["depuracion"] },
      { q: "¿Cuál es la diferencia entre un bug y una feature?", answers: ["Ninguna diferencia", "Un bug es comportamiento no intencional; una feature es funcionalidad deseada", "Los bugs son más difíciles de corregir", "Las features son gratuitas, los bugs cuestan dinero"], correct: 1, explanation: "Un bug es comportamiento incorrecto o inesperado. Una feature es funcionalidad intencionalmente añadida.", difficulty: 1, topicTags:["principios"] },
      { q: "¿Qué es el control de versiones?", answers: ["Contar actualizaciones de software", "Sistema que rastrea cambios en archivos a lo largo del tiempo", "Hacer copia de seguridad solo de la versión más reciente", "Numerar versiones"], correct: 1, explanation: "El control de versiones (como Git) registra el historial de cambios, permite colaboración, retrocesos y ramas.", difficulty: 1, topicTags:["versionado","git"] },
    ],
  },
};

// ─── Clé localStorage pour les questions vues ───────────────────────────────
const SEEN_QUESTIONS_KEY = "rl_seen_questions";

function getSeenQuestions(topicKey) {
  try {
    const data = JSON.parse(localStorage.getItem(SEEN_QUESTIONS_KEY) || "{}");
    return new Set(data[topicKey] || []);
  } catch (_) { return new Set(); }
}

function markQuestionsSeen(topicKey, questions) {
  try {
    const data = JSON.parse(localStorage.getItem(SEEN_QUESTIONS_KEY) || "{}");
    const existing = new Set(data[topicKey] || []);
    questions.forEach(q => existing.add(q.q));
    // Limit to 100 per topic to avoid bloat
    const arr = [...existing];
    data[topicKey] = arr.length > 100 ? arr.slice(-100) : arr;
    localStorage.setItem(SEEN_QUESTIONS_KEY, JSON.stringify(data));
  } catch (_) {}
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Mélange les réponses et met à jour l'index correct en conséquence
function shuffleAnswers(q) {
  const correctText = q.answers[q.correct];
  const shuffled = shuffle(q.answers);
  return { ...q, answers: shuffled, correct: shuffled.indexOf(correctText) };
}

function generateMockSteps(levelName, sectionTitle, currentLang) {
  const key = detectTopicKey(levelName);
  const difficulty = getDifficultyFromSection(sectionTitle);

  // Sélection de la base de données selon la langue
  let dbToUse;
  if (currentLang === 'en' && MOCK_DB_EN[key]) {
    dbToUse = MOCK_DB_EN[key];
  } else if (currentLang === 'es' && MOCK_DB_ES[key]) {
    dbToUse = MOCK_DB_ES[key];
  } else {
    dbToUse = MOCK_DB[key] || MOCK_DB.generic;
  }
  // Fallback si langue non dispo pour ce topic
  if (!dbToUse) dbToUse = MOCK_DB[key] || MOCK_DB.generic;

  const allQuestions = dbToUse.questions || [];
  const filtered = allQuestions.filter(q => !q.difficulty || q.difficulty <= difficulty);
  const pool = filtered.length >= 3 ? filtered : allQuestions;

  // Priorité aux questions non vues (Fisher-Yates sur tout le pool)
  const seen = getSeenQuestions(key + '_' + (currentLang || 'fr'));
  const unseen = pool.filter(q => !seen.has(q.q));
  const seenPool = pool.filter(q => seen.has(q.q));

  // Mélange séparé, puis concaténation : unseen en premier, seen en dernier
  const shuffledUnseen = shuffle(unseen);
  const shuffledSeen = shuffle(seenPool);
  const ordered = [...shuffledUnseen, ...shuffledSeen];

  // Prendre entre 5 et 8 questions (selon la taille du pool)
  const count = Math.min(8, Math.max(5, Math.floor(ordered.length * 0.4)));
  const selected = ordered.slice(0, count);

  // Marquer comme vues
  markQuestionsSeen(key + '_' + (currentLang || 'fr'), selected);

  // Mélanger les réponses de chaque question (Fisher-Yates sur answers, correct index mis à jour)
  const questionsWithShuffledAnswers = selected.map(shuffleAnswers);

  return [
    { type: "theory", content: dbToUse.theory },
    ...questionsWithShuffledAnswers.map(q => ({ type: "quiz", ...q })),
  ];
}

// ─── Données ─────────────────────────────────────────────────────────────────
const ROADMAPS = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "🌐",
    color: "bg-blue-100",
    textColor: "text-blue-900",
    progColor: "bg-blue-600",
    sections: [
      {
        title: "FONDAMENTAUX",
        levels: [
          { name: "HTML — Structure & sémantique", xp: 30, type: "theory+quiz" },
          { name: "HTML — Formulaires & médias", xp: 30, type: "quiz" },
          { name: "CSS — Sélecteurs & cascade", xp: 35, type: "theory+quiz" },
          { name: "CSS — Flexbox", xp: 40, type: "code+quiz" },
          { name: "CSS — Grid Layout", xp: 40, type: "code+quiz" },
          { name: "CSS — Responsive & media queries", xp: 45, type: "quiz" },
        ],
      },
      {
        title: "JAVASCRIPT",
        levels: [
          { name: "JS — Variables & types", xp: 40, type: "theory+quiz" },
          { name: "JS — Fonctions & scope", xp: 45, type: "code+quiz" },
          { name: "JS — DOM Manipulation", xp: 50, type: "code+quiz" },
          { name: "JS — Events & formulaires", xp: 50, type: "challenge" },
          { name: "JS — Fetch & API REST", xp: 55, type: "code+quiz" },
          { name: "JS — Promises & async/await", xp: 60, type: "theory+quiz" },
          { name: "JS — Modules ES6", xp: 50, type: "quiz" },
        ],
      },
      {
        title: "FRAMEWORKS",
        levels: [
          { name: "React — Composants & JSX", xp: 60, type: "theory+quiz" },
          { name: "React — State & Props", xp: 65, type: "code+quiz" },
          { name: "React — Hooks (useState, useEffect)", xp: 70, type: "code+quiz" },
          { name: "React — Context API", xp: 70, type: "challenge" },
          { name: "Vue.js — Bases", xp: 60, type: "theory+quiz" },
          { name: "TypeScript — Types & interfaces", xp: 65, type: "theory+quiz" },
        ],
      },
      {
        title: "AVANCÉ",
        levels: [
          { name: "Performance & optimisation", xp: 80, type: "quiz" },
          { name: "Accessibilité (a11y)", xp: 75, type: "theory+quiz" },
          { name: "Testing — Jest & Testing Library", xp: 80, type: "challenge" },
          { name: "Build tools — Vite & Webpack", xp: 75, type: "theory+quiz" },
          { name: "Progressive Web Apps", xp: 85, type: "quiz" },
        ],
      },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "⚙️",
    color: "bg-emerald-100",
    textColor: "text-emerald-900",
    progColor: "bg-emerald-600",
    sections: [
      {
        title: "BASES",
        levels: [
          { name: "HTTP & protocoles web", xp: 35, type: "theory+quiz" },
          { name: "API REST — Concepts", xp: 40, type: "theory+quiz" },
          { name: "Node.js — Introduction", xp: 40, type: "theory+quiz" },
          { name: "Node.js — Modules & NPM", xp: 45, type: "code+quiz" },
          { name: "Express.js — Routing", xp: 50, type: "code+quiz" },
          { name: "Express.js — Middleware", xp: 55, type: "code+quiz" },
        ],
      },
      {
        title: "BASES DE DONNÉES",
        levels: [
          { name: "SQL — Requêtes fondamentales", xp: 50, type: "code+quiz" },
          { name: "SQL — Jointures & sous-requêtes", xp: 60, type: "code+quiz" },
          { name: "PostgreSQL — Configuration", xp: 55, type: "theory+quiz" },
          { name: "MongoDB — Documents & collections", xp: 55, type: "theory+quiz" },
          { name: "ORM — Prisma & Sequelize", xp: 60, type: "code+quiz" },
          { name: "Redis — Cache & sessions", xp: 65, type: "theory+quiz" },
        ],
      },
      {
        title: "SÉCURITÉ & AUTH",
        levels: [
          { name: "Authentification JWT", xp: 65, type: "code+quiz" },
          { name: "OAuth 2.0 & OpenID", xp: 70, type: "theory+quiz" },
          { name: "Hachage & cryptographie", xp: 65, type: "theory+quiz" },
          { name: "Sécurisation des API", xp: 70, type: "challenge" },
        ],
      },
      {
        title: "AVANCÉ",
        levels: [
          { name: "Architecture microservices", xp: 80, type: "theory+quiz" },
          { name: "GraphQL — Schémas & resolvers", xp: 80, type: "code+quiz" },
          { name: "WebSockets & temps réel", xp: 75, type: "code+quiz" },
          { name: "Queues & workers (Bull)", xp: 80, type: "theory+quiz" },
        ],
      },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "🔧",
    color: "bg-amber-100",
    textColor: "text-amber-900",
    progColor: "bg-amber-600",
    sections: [
      {
        title: "LINUX & TERMINAL",
        levels: [
          { name: "Commandes Linux essentielles", xp: 35, type: "theory+quiz" },
          { name: "Gestion des fichiers & permissions", xp: 40, type: "quiz" },
          { name: "Bash scripting — Bases", xp: 50, type: "code+quiz" },
          { name: "SSH & accès distant", xp: 45, type: "theory+quiz" },
        ],
      },
      {
        title: "GIT & CI/CD",
        levels: [
          { name: "Git — Commits & branches", xp: 40, type: "theory+quiz" },
          { name: "Git — Merge, rebase & conflits", xp: 50, type: "quiz" },
          { name: "GitHub Actions — Workflows", xp: 55, type: "code+quiz" },
          { name: "GitLab CI/CD", xp: 55, type: "theory+quiz" },
        ],
      },
      {
        title: "CONTENEURS & CLOUD",
        levels: [
          { name: "Docker — Images & conteneurs", xp: 60, type: "theory+quiz" },
          { name: "Docker Compose", xp: 65, type: "code+quiz" },
          { name: "Kubernetes — Pods & services", xp: 75, type: "theory+quiz" },
          { name: "Kubernetes — Déploiements", xp: 80, type: "challenge" },
          { name: "AWS — Services essentiels", xp: 70, type: "theory+quiz" },
          { name: "Infrastructure as Code — Terraform", xp: 80, type: "theory+quiz" },
        ],
      },
      {
        title: "MONITORING",
        levels: [
          { name: "Logging — ELK Stack", xp: 70, type: "theory+quiz" },
          { name: "Prometheus & Grafana", xp: 75, type: "theory+quiz" },
          { name: "Alerting & SLO", xp: 75, type: "quiz" },
        ],
      },
    ],
  },
  {
    id: "ai",
    name: "IA & ML",
    icon: "🤖",
    color: "bg-purple-100",
    textColor: "text-purple-900",
    progColor: "bg-purple-600",
    badge: "Nouveau",
    sections: [
      {
        title: "FONDAMENTAUX",
        levels: [
          { name: "Concepts du Machine Learning", xp: 40, type: "theory+quiz" },
          { name: "Python pour la data science", xp: 45, type: "code+quiz" },
          { name: "NumPy & Pandas", xp: 50, type: "code+quiz" },
          { name: "Matplotlib & visualisation", xp: 45, type: "code+quiz" },
        ],
      },
      {
        title: "MODÈLES ML",
        levels: [
          { name: "Régression linéaire & logistique", xp: 55, type: "theory+quiz" },
          { name: "Arbres de décision & Random Forest", xp: 60, type: "theory+quiz" },
          { name: "SVM & K-means", xp: 60, type: "theory+quiz" },
          { name: "Évaluation & métriques", xp: 55, type: "quiz" },
          { name: "Scikit-learn — Pipeline", xp: 65, type: "code+quiz" },
        ],
      },
      {
        title: "DEEP LEARNING",
        levels: [
          { name: "Réseaux de neurones — Bases", xp: 70, type: "theory+quiz" },
          { name: "PyTorch — Introduction", xp: 75, type: "code+quiz" },
          { name: "CNN — Vision par ordinateur", xp: 80, type: "theory+quiz" },
          { name: "RNN & LSTM — Séquences", xp: 80, type: "theory+quiz" },
          { name: "Transformers — Architecture", xp: 85, type: "theory+quiz" },
        ],
      },
      {
        title: "LLMs & PROMPTING",
        levels: [
          { name: "LLMs — Comment ça fonctionne", xp: 70, type: "theory+quiz" },
          { name: "Prompt engineering", xp: 65, type: "challenge" },
          { name: "RAG — Retrieval Augmented Generation", xp: 80, type: "theory+quiz" },
          { name: "Fine-tuning de modèles", xp: 85, type: "theory+quiz" },
          { name: "Déploiement de modèles IA", xp: 85, type: "theory+quiz" },
        ],
      },
    ],
  },
  {
    id: "security",
    name: "Cybersécurité",
    icon: "🔐",
    color: "bg-red-100",
    textColor: "text-red-900",
    progColor: "bg-red-600",
    sections: [
      {
        title: "FONDAMENTAUX",
        levels: [
          { name: "Modèles de sécurité (CIA)", xp: 35, type: "theory+quiz" },
          { name: "OWASP Top 10 — Injection", xp: 50, type: "theory+quiz" },
          { name: "OWASP — XSS & CSRF", xp: 55, type: "theory+quiz" },
          { name: "Cryptographie — Symétrique", xp: 55, type: "theory+quiz" },
          { name: "Cryptographie — Asymétrique & PKI", xp: 60, type: "theory+quiz" },
        ],
      },
      {
        title: "RÉSEAU & PENTEST",
        levels: [
          { name: "Sécurité réseau — TCP/IP", xp: 55, type: "theory+quiz" },
          { name: "Pare-feu & IDS/IPS", xp: 60, type: "theory+quiz" },
          { name: "Pentest — Méthodologie", xp: 65, type: "theory+quiz" },
          { name: "Nmap & reconnaissance", xp: 65, type: "quiz" },
          { name: "Exploitation — Bases", xp: 70, type: "theory+quiz" },
        ],
      },
      {
        title: "AVANCÉ",
        levels: [
          { name: "Forensique numérique", xp: 75, type: "theory+quiz" },
          { name: "Sécurité cloud & DevSecOps", xp: 80, type: "theory+quiz" },
          { name: "Gestion des incidents", xp: 75, type: "challenge" },
        ],
      },
    ],
  },
  {
    id: "fullstack",
    name: "Full Stack",
    icon: "🚀",
    color: "bg-pink-100",
    textColor: "text-pink-900",
    progColor: "bg-pink-600",
    badge: "Populaire",
    sections: [
      {
        title: "ARCHITECTURE",
        levels: [
          { name: "Architecture MVC", xp: 45, type: "theory+quiz" },
          { name: "Monolithes vs microservices", xp: 50, type: "theory+quiz" },
          { name: "Design patterns essentiels", xp: 55, type: "theory+quiz" },
          { name: "API-first design", xp: 50, type: "theory+quiz" },
        ],
      },
      {
        title: "PROJET INTÉGRÉ",
        levels: [
          { name: "Authentification full stack", xp: 70, type: "code+quiz" },
          { name: "CRUD complet avec React + Node", xp: 75, type: "challenge" },
          { name: "Gestion d'état avancée", xp: 70, type: "code+quiz" },
          { name: "Upload de fichiers", xp: 65, type: "code+quiz" },
          { name: "Emails transactionnels", xp: 60, type: "theory+quiz" },
          { name: "Paiements — Stripe", xp: 75, type: "theory+quiz" },
        ],
      },
      {
        title: "DÉPLOIEMENT",
        levels: [
          { name: "Hébergement — Vercel & Railway", xp: 60, type: "theory+quiz" },
          { name: "Variables d'environnement", xp: 50, type: "theory+quiz" },
          { name: "Domaine & SSL", xp: 55, type: "theory+quiz" },
          { name: "Monitoring en production", xp: 65, type: "theory+quiz" },
        ],
      },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    icon: "📱",
    color: "bg-green-100",
    textColor: "text-green-900",
    progColor: "bg-green-600",
    badge: "Nouveau",
    sections: [
      {
        title: "REACT NATIVE",
        levels: [
          { name: "React Native — Introduction", xp: 45, type: "theory+quiz" },
          { name: "Composants natifs", xp: 50, type: "code+quiz" },
          { name: "Navigation — React Navigation", xp: 55, type: "code+quiz" },
          { name: "State management mobile", xp: 60, type: "code+quiz" },
          { name: "Animations & Reanimated", xp: 70, type: "code+quiz" },
        ],
      },
      {
        title: "FLUTTER",
        levels: [
          { name: "Flutter & Dart — Bases", xp: 50, type: "theory+quiz" },
          { name: "Widgets & layout", xp: 55, type: "code+quiz" },
          { name: "State avec Provider/Riverpod", xp: 65, type: "code+quiz" },
          { name: "Navigation Flutter", xp: 60, type: "code+quiz" },
        ],
      },
      {
        title: "NATIF & PUBLICATION",
        levels: [
          { name: "APIs natives (caméra, GPS…)", xp: 70, type: "theory+quiz" },
          { name: "Push notifications", xp: 65, type: "theory+quiz" },
          { name: "Publication App Store & Google Play", xp: 60, type: "theory+quiz" },
        ],
      },
    ],
  },
  {
    id: "sql",
    name: "SQL & Data",
    icon: "🗄️",
    color: "bg-stone-100",
    textColor: "text-stone-900",
    progColor: "bg-stone-600",
    sections: [
      {
        title: "BASES SQL",
        levels: [
          { name: "SELECT & filtres", xp: 30, type: "code+quiz" },
          { name: "Jointures (INNER, LEFT, RIGHT)", xp: 45, type: "code+quiz" },
          { name: "Agrégations & GROUP BY", xp: 45, type: "code+quiz" },
          { name: "Sous-requêtes", xp: 50, type: "code+quiz" },
          { name: "Index & performances", xp: 55, type: "theory+quiz" },
        ],
      },
      {
        title: "AVANCÉ",
        levels: [
          { name: "Transactions & ACID", xp: 60, type: "theory+quiz" },
          { name: "Fenêtres de fonctions (OVER)", xp: 65, type: "code+quiz" },
          { name: "Vues & procédures stockées", xp: 60, type: "code+quiz" },
          { name: "Modélisation — Normalisation", xp: 65, type: "theory+quiz" },
        ],
      },
      {
        title: "DATA ENGINEERING",
        levels: [
          { name: "ETL — Extraire, Transformer, Charger", xp: 70, type: "theory+quiz" },
          { name: "Data warehousing", xp: 70, type: "theory+quiz" },
          { name: "Spark & big data", xp: 80, type: "theory+quiz" },
          { name: "dbt — Transformation SQL", xp: 75, type: "theory+quiz" },
        ],
      },
    ],
  },
];

const BADGES = [
  { icon: "🚀", name: "Premier pas",   desc: "Terminer 1 niveau",               check: (s) => s.lvlDone >= 1 },
  { icon: "🔥", name: "En feu",        desc: "5 niveaux terminés",               check: (s) => s.lvlDone >= 5 },
  { icon: "💎", name: "Diamant",       desc: "Atteindre 300 XP",                 check: (s) => s.xp >= 300 },
  { icon: "🏆", name: "Champion",      desc: "15 niveaux terminés",              check: (s) => s.lvlDone >= 15 },
  { icon: "🌟", name: "Expert",        desc: "Atteindre 1000 XP",                check: (s) => s.xp >= 1000 },
  { icon: "🎯", name: "Précis",        desc: "5 quiz parfaits",                  check: (s) => s.perfectQuiz >= 5 },
  { icon: "📚", name: "Studieux",      desc: "30 niveaux terminés",              check: (s) => s.lvlDone >= 30 },
  { icon: "⚡", name: "Rapide",        desc: "Atteindre 500 XP",                 check: (s) => s.xp >= 500 },
  { icon: "📅", name: "7 jours !",     desc: "7 jours de série consécutifs",     check: (s) => s.streak >= 7 },
  { icon: "🗓️", name: "Mois entier",  desc: "30 jours de série",                check: (s) => s.streak >= 30 },
  { icon: "⚡", name: "Défi du jour",  desc: "Compléter le Daily Challenge",     check: (s) => s.dailyChallenge && s.dailyChallenge.done },
  { icon: "🏅", name: "Streak record", desc: "Record de série > 10 jours",       check: (s) => (s.bestStreak || 0) >= 10 },
  { icon: "🔁", name: "Persévérant",   desc: "Rejouer un niveau après échec",    check: (s) => s.replayed >= 1 },
  { icon: "💯", name: "Perfect x10",   desc: "10 quiz parfaits",                 check: (s) => s.perfectQuiz >= 10 },
  { icon: "🌈", name: "Touche-à-tout", desc: "3 roadmaps commencées",            check: (s) => Object.keys(s.done || {}).filter(k => (s.done[k] || []).length > 0).length >= 3 },
  { icon: "🎓", name: "Diplômé",       desc: "Terminer entièrement 1 roadmap",   check: (s) => ROADMAPS.some(rm => { let t = 0; rm.sections.forEach(sec => t += sec.levels.length); return (s.done[rm.id] || []).length >= t; }) },
];

const LB_INIT = [
  { n: "Alexandre", xp: 1580, av: "A", bg: "bg-blue-100", tc: "text-blue-900" },
  { n: "Marie", xp: 1240, av: "M", bg: "bg-emerald-100", tc: "text-emerald-900" },
  { n: "Lucas", xp: 920, av: "L", bg: "bg-amber-100", tc: "text-amber-900" },
  { n: "Sophia", xp: 780, av: "S", bg: "bg-purple-100", tc: "text-purple-900" },
  { n: "Paul", xp: 650, av: "P", bg: "bg-rose-100", tc: "text-rose-900" },
  { n: "Emma", xp: 510, av: "E", bg: "bg-green-100", tc: "text-green-900" },
  { n: "Toi", xp: 0, av: "?", bg: "bg-stone-100", tc: "text-stone-900", isYou: true },
  { n: "Nathan", xp: 320, av: "N", bg: "bg-pink-100", tc: "text-pink-900" },
  { n: "Chloé", xp: 180, av: "C", bg: "bg-red-100", tc: "text-red-900" },
];

function userLevel(xp) {
  if (xp < 100) return { n: 1, t: "Débutant", next: 100 };
  if (xp < 300) return { n: 2, t: "Apprenti", next: 300 };
  if (xp < 600) return { n: 3, t: "Intermédiaire", next: 600 };
  if (xp < 1000) return { n: 4, t: "Avancé", next: 1000 };
  if (xp < 1500) return { n: 5, t: "Expert", next: 1500 };
  return { n: 6, t: "Maître", next: 2000 };
}

// ── Audio feedback (Web Audio API, aucun fichier externe) ──────────────────────
function playBeep(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.45);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (_) {}
}

// ── Daily Challenge (question du jour déterministe) ────────────────────────────
function getDailyChallenge() {
  const today = new Date().toISOString().slice(0, 10);
  const keys = Object.keys(MOCK_DB).filter(k => MOCK_DB[k].questions && MOCK_DB[k].questions.length >= 2);
  const seed = today.replace(/-/g, '').split('').reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const key = keys[seed % keys.length];
  const pool = MOCK_DB[key].questions.filter(q => q.difficulty === 1 || q.difficulty === 2);
  const q = pool[seed % pool.length] || MOCK_DB[key].questions[0];
  return { ...q, topicKey: key, date: today, theory: MOCK_DB[key].theory };
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function RoadLearn() {
  // ── État API & utilisateur
  const [hasStarted, setHasStarted] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [username, setUsername] = useState("Joueur");
  const [usernameInput, setUsernameInput] = useState("");
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingApiKey, setEditingApiKey] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");
  const [geminiKeyInput, setGeminiKeyInput] = useState("");
  const [editingGeminiKey, setEditingGeminiKey] = useState(false);
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [googleToken, setGoogleToken] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const tokenClientRef = React.useRef(null);

  // ── État navigation
  const [screen, setScreen] = useState("home");
  const [tab, setTab] = useState("home");

  // ── État jeu
  const [state, setState] = useState({
    xp: 0,
    streak: 1,
    lvlDone: 0,
    done: {},
    perfectQuiz: 0,
    sessionDates: [],
    bestStreak: 1,
    dailyChallenge: { date: null, done: false },
    replayed: 0,
  });
  const [ttsSpeed, setTtsSpeed] = useState(0.9);
  const [confetti, setConfetti] = useState(false);
  const [dailyChallengeResult, setDailyChallengeResult] = useState(null);
  const [showErrorReview, setShowErrorReview] = useState(false);
  const wrongAnswersRef = useRef([]);
  const [curRM, setCurRM] = useState(null);
  const [curSecIdx, setCurSecIdx] = useState(null);
  const [curLvlIdx, setCurLvlIdx] = useState(null);
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAns, setSelectedAns] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('fr');
  const [notifSettings, setNotifSettings] = useState({ global:false, lesson:true, streak:true, lb:false, time:'19:00' });
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  // ── Thème + langue + notifications : chargement initial
  useEffect(() => {
    const savedTheme = localStorage.getItem('rl_theme');
    if (savedTheme === 'dark') { setDark(true); document.documentElement.classList.add('dark'); }
    const savedLang = localStorage.getItem('rl_lang');
    if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
    try {
      const savedNotif = localStorage.getItem('rl_notif');
      if (savedNotif) setNotifSettings(JSON.parse(savedNotif));
      const savedSpeed = localStorage.getItem('rl_tts_speed');
      if (savedSpeed) setTtsSpeed(parseFloat(savedSpeed));
    } catch(_) {}
  }, []);

  function toggleTheme() {
    const nd = !dark;
    setDark(nd);
    document.documentElement.classList.toggle('dark', nd);
    try { localStorage.setItem('rl_theme', nd ? 'dark' : 'light'); } catch(_) {}
  }

  function changeLang(code) {
    setLang(code);
    try { localStorage.setItem('rl_lang', code); } catch(_) {}
  }

  function changeTtsSpeed(s) {
    setTtsSpeed(s);
    try { localStorage.setItem('rl_tts_speed', String(s)); } catch(_) {}
  }

  // ── Daily Challenge handler
  function handleDailyChallenge(dc, idx) {
    if (dailyChallengeResult) return;
    const today = new Date().toISOString().slice(0, 10);
    const isCorrect = idx === dc.correct;
    playBeep(isCorrect ? 'correct' : 'wrong');
    setDailyChallengeResult({ isCorrect, chosen: idx, correct: dc.correct, explanation: dc.explanation });
    setState(s => ({
      ...s,
      xp: s.xp + (isCorrect ? 20 : 5),
      dailyChallenge: { date: today, done: true, correct: isCorrect },
    }));
  }

  function saveNotif(updated) {
    setNotifSettings(updated);
    try { localStorage.setItem('rl_notif', JSON.stringify(updated)); } catch(_) {}
  }

  // ── TTS (Text-to-Speech)
  const TTS_LANG = { fr:'fr-FR', en:'en-US', es:'es-ES', pt:'pt-BR', de:'de-DE', it:'it-IT', nl:'nl-NL', ja:'ja-JP' };

  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    if (ttsPlaying) { window.speechSynthesis.cancel(); setTtsPlaying(false); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const targetLang = TTS_LANG[lang] || 'fr-FR';
    utter.lang = targetLang;
    // Sélection de la voix la plus naturelle disponible
    const trySpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const langCode = targetLang.split('-')[0];
        const scored = voices
          .filter(v => v.lang.startsWith(langCode))
          .map(v => {
            let s = 0;
            const n = v.name.toLowerCase();
            if (n.includes('natural'))  s += 12;
            if (n.includes('neural'))   s += 11;
            if (n.includes('wavenet'))  s += 10;
            if (n.includes('premium'))  s += 9;
            if (n.includes('enhanced')) s += 8;
            if (n.includes('google'))    s += 5;
            if (n.includes('microsoft')) s += 4;
            if (!v.localService) s += 3; // voix online = plus naturelles
            if (v.lang === targetLang) s += 4; // locale exacte préférée
            const femNames = ['amélie','léa','lea','audrey','marie','samantha','karen','moira','victoria','allison','susan','joana','luciana','ava','aria','alice','elsa','linda','emma'];
            if (femNames.some(fn => n.includes(fn))) s += 3;
            return { v, s };
          })
          .sort((a, b) => b.s - a.s);
        if (scored.length > 0) utter.voice = scored[0].v;
      }
      utter.rate = ttsSpeed;
      utter.pitch = 0.95; // légèrement plus grave = plus humain
      utter.volume = 1;
      utter.onend = () => setTtsPlaying(false);
      utter.onerror = () => setTtsPlaying(false);
      window.speechSynthesis.speak(utter);
      setTtsPlaying(true);
    };
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.onvoiceschanged = null; trySpeak(); };
    } else {
      trySpeak();
    }
  }

  useEffect(() => { if (window.speechSynthesis) { window.speechSynthesis.cancel(); } setTtsPlaying(false); setShowTheory(false); }, [screen]);
  useEffect(() => { if (window.speechSynthesis) { window.speechSynthesis.cancel(); } setTtsPlaying(false); }, [stepIdx]);

  // Traduction courante
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  // ── Chargement depuis localStorage au démarrage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);

        if (data.hasStarted) setHasStarted(true);
        if (data.apiKey) {
          setApiKey(data.apiKey);
          setApiKeyInput(data.apiKey);
        }
        if (data.geminiKey) {
          setGeminiKey(data.geminiKey);
          setGeminiKeyInput(data.geminiKey);
        }
        if (data.username) {
          setUsername(data.username);
          setUsernameInput(data.username);
        }

        if (data.gameState) {
          let gs = { ...data.gameState };

          // Logique de streak journalier
          const today = new Date().toDateString();
          if (data.lastLoginDate) {
            if (data.lastLoginDate !== today) {
              const yesterday = new Date(Date.now() - 86400000).toDateString();
              gs.streak = data.lastLoginDate === yesterday
                ? (gs.streak || 1) + 1
                : 1;
            }
          }

          setState(gs);
        }
      }

      // Mettre à jour la date de dernière connexion
      const today = new Date().toDateString();
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, lastLoginDate: today }));
    } catch (_) {}
  }, []);

  // ── Sauvegarde automatique dans localStorage
  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...existing,
        hasStarted,
        apiKey,
        geminiKey,
        username,
        gameState: state,
      }));
    } catch (_) {}
  }, [state, apiKey, geminiKey, username, hasStarted]);

  // ── Helpers
  const ul = userLevel(state.xp);
  const xpPct = Math.min(100, Math.round((state.xp / (ul.next || 2000)) * 100));
  const avatarLetter = username ? username.charAt(0).toUpperCase() : "U";

  function getLevelIdx(rmId, secIdx, lvlIdx) {
    const rm = ROADMAPS.find((r) => r.id === rmId);
    let flat = 0;
    for (let i = 0; i < secIdx; i++) flat += rm.sections[i].levels.length;
    return flat + lvlIdx;
  }

  function isDone(rmId, secIdx, lvlIdx) {
    return (state.done[rmId] || []).includes(getLevelIdx(rmId, secIdx, lvlIdx));
  }

  function isUnlocked(rmId, secIdx, lvlIdx) {
    if (secIdx === 0 && lvlIdx === 0) return true;
    const fi = getLevelIdx(rmId, secIdx, lvlIdx);
    return fi === 0 || (state.done[rmId] || []).includes(fi - 1);
  }

  function navTo(s) {
    setTab(s);
    setScreen(s);
    if (s !== 'home') setDailyChallengeResult(null);
  }

  // ── Confetti overlay
  const ConfettiOverlay = () => {
    const colors = ['#3b82f6','#6366f1','#10b981','#f59e0b','#ec4899','#8b5cf6','#ef4444','#14b8a6'];
    const pieces = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.8}s`,
      duration: `${1.8 + Math.random() * 1.2}s`,
    }));
    useEffect(() => { const t = setTimeout(() => setConfetti(false), 3200); return () => clearTimeout(t); }, []);
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
        {pieces.map(p => (
          <div key={p.id} style={{
            position: 'absolute', top: -10, left: p.left,
            width: 9, height: 14, borderRadius: 3,
            background: p.color,
            animation: `confettiFall ${p.duration} ease-in forwards`,
            animationDelay: p.delay,
          }} />
        ))}
      </div>
    );
  };

  // ── Noms de langue pour le prompt IA
  const LANG_NAMES      = { fr:'français', en:'English', es:'español', pt:'português', de:'Deutsch', it:'italiano', nl:'Nederlands', ja:'日本語' };
  const L_GEMINI = {
    fr:{label:"Clé API Gemini (gratuite)",placeholder:"AIzaSy...",get:"Obtenir une clé gratuite →",notConfigured:"Non configurée",required:"Clé API requise",requiredDesc:"Configure ta clé API Gemini gratuite dans l'onglet Profil"},
    en:{label:"Gemini API Key (free)",placeholder:"AIzaSy...",get:"Get a free key →",notConfigured:"Not configured",required:"API key required",requiredDesc:"Configure your free Gemini API key in the Profile tab"},
    es:{label:"Clave API Gemini (gratis)",placeholder:"AIzaSy...",get:"Obtener clave gratis →",notConfigured:"No configurada",required:"Clave API requerida",requiredDesc:"Configura tu clave API Gemini gratis en la pestaña Perfil"},
    pt:{label:"Chave API Gemini (grátis)",placeholder:"AIzaSy...",get:"Obter chave grátis →",notConfigured:"Não configurada",required:"Chave API necessária",requiredDesc:"Configura a tua chave API Gemini grátis no separador Perfil"},
    de:{label:"Gemini API-Schlüssel (kostenlos)",placeholder:"AIzaSy...",get:"Kostenlosen Schlüssel →",notConfigured:"Nicht konfiguriert",required:"API-Schlüssel erforderlich",requiredDesc:"Konfiguriere deinen kostenlosen Gemini API-Schlüssel im Profil-Tab"},
    it:{label:"Chiave API Gemini (gratuita)",placeholder:"AIzaSy...",get:"Ottieni chiave gratuita →",notConfigured:"Non configurata",required:"Chiave API richiesta",requiredDesc:"Configura la tua chiave API Gemini gratuita nella scheda Profilo"},
    nl:{label:"Gemini API-sleutel (gratis)",placeholder:"AIzaSy...",get:"Gratis sleutel ophalen →",notConfigured:"Niet geconfigureerd",required:"API-sleutel vereist",requiredDesc:"Configureer je gratis Gemini API-sleutel in het tabblad Profiel"},
    ja:{label:"Gemini APIキー（無料）",placeholder:"AIzaSy...",get:"無料キーを取得 →",notConfigured:"未設定",required:"APIキーが必要です",requiredDesc:"プロフィールタブで無料のGemini APIキーを設定してください"},
  };
  const TTS_SPEED_LABEL = { fr:'Vitesse lecture TTS', en:'TTS Speed', es:'Velocidad TTS', pt:'Velocidade TTS', de:'TTS-Tempo', it:'Velocità TTS', nl:'TTS-snelheid', ja:'TTS速度' };
  const TTS_SPEED_SUB   = { fr:'Vitesse de la synthèse vocale', en:'Text-to-speech rate', es:'Velocidad de síntesis de voz', pt:'Velocidade de síntese de voz', de:'Sprachausgabe-Tempo', it:'Velocità di sintesi vocale', nl:'Spraaksnelheid', ja:'音声合成速度' };
  function buildLessonPrompt(lvName, rmName, langCode) {
    const langName = LANG_NAMES[langCode] || 'français';
    return `Generate an interactive programming lesson in ${langName} on the topic: "${lvName}" (course: ${rmName}).

STRICT RULES:
1. Write ONE theory block first — explain all core concepts clearly.
2. Write 4–5 quiz questions that ONLY test concepts already explained in the theory above. No question may reference a concept not covered in the theory.
3. Each question must have exactly 4 answer choices (A-D), with the correct answer at a varied index (not always 0).
4. All text (theory, questions, answers, explanations) must be in ${langName}.

Respond ONLY with a valid JSON array, no markdown:
[{"type":"theory","content":"..."},{"type":"quiz","q":"...","answers":["A","B","C","D"],"correct":1,"explanation":"..."},...]`;
  }

  // ── Démarrer une leçon
  async function startLesson(rmId, secIdx, lvlIdx) {
    setCurRM(rmId);
    setCurSecIdx(secIdx);
    setCurLvlIdx(lvlIdx);
    setSteps([]);
    setStepIdx(0);
    setLives(3);
    setCorrect(0);
    setAnswered(false);
    setSelectedAns(null);
    setError(null);
    setShowErrorReview(false);
    setConfetti(false);
    wrongAnswersRef.current = [];

    const rm = ROADMAPS.find((r) => r.id === rmId);
    const lv = rm.sections[secIdx].levels[lvlIdx];
    if (!geminiKey && !apiKey) {
      setNeedsApiKey(true);
      setLoading(false);
      setScreen("lesson");
      return;
    }
    setNeedsApiKey(false);
    setLoading(true);
    setScreen("lesson");

    // ── Cache des leçons (économie de quota) ─────────────────────────────────
    const cacheKey = `rl_lc_${rmId}_${secIdx}_${lvlIdx}_${lang}`;
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
      if (cached && cached.ts && Date.now() - cached.ts < 7 * 24 * 3600 * 1000) {
        setSteps(cached.steps); setLoading(false); return;
      }
    } catch(_) {}

    try {
      let text = "";
      if (geminiKey) {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: buildLessonPrompt(lv.name, rm.name, lang) }] }], generationConfig: { maxOutputTokens: 700 } }),
        });
        if (resp.ok) { const data = await resp.json(); text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""; }
      } else {
        const resp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
          body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 700, messages: [{ role: "user", content: buildLessonPrompt(lv.name, rm.name, lang) }] }),
        });
        if (resp.ok) { const data = await resp.json(); text = (data.content || []).map((i) => i.text || "").join(""); }
      }
      if (text) {
        let clean = text.replace(/```json\s*/g, "").replace(/```/g, "").trim();
        const si = clean.indexOf("["), ei = clean.lastIndexOf("]");
        if (si !== -1) {
          clean = ei > si ? clean.slice(si, ei + 1) : clean.slice(si);
          const parsed = JSON.parse(clean);
          if (Array.isArray(parsed) && parsed.length > 0) {
            try { localStorage.setItem(cacheKey, JSON.stringify({ steps: parsed, ts: Date.now() })); } catch(_) {}
            setSteps(parsed); setLoading(false); return;
          }
        }
      }
    } catch(_) {
      setError(t.lesson?.errorTitle || "Erreur de génération");
      setLoading(false);
      return;
    }
    setError(t.lesson?.errorTitle || "Erreur de génération");
    setLoading(false);
  }

  function handleAnswer(idx) {
    if (answered) return;
    const step = steps[stepIdx];
    setSelectedAns(idx);
    setAnswered(true);
    if (idx === step.correct) {
      setCorrect((c) => c + 1);
      playBeep('correct');
    } else {
      setLives((l) => Math.max(0, l - 1));
      playBeep('wrong');
      wrongAnswersRef.current = [...wrongAnswersRef.current, { ...step, chosen: idx }];
    }
  }

  function nextStep() {
    if (lives === 0) { endLesson(true); return; }
    if (stepIdx + 1 >= steps.length) { endLesson(false); return; }
    setStepIdx((i) => i + 1);
    setAnswered(false);
    setSelectedAns(null);
  }

  function endLesson(failed) {
    const rm = ROADMAPS.find((r) => r.id === curRM);
    const lv = rm.sections[curSecIdx].levels[curLvlIdx];
    const quizCount = steps.filter((s) => s.type !== "theory").length;
    const acc = quizCount ? Math.round((correct / quizCount) * 100) : 100;
    const perfect = acc === 100 && !failed;
    const masteryWarn = !failed && !perfect && acc < 70;
    const xpGain = failed
      ? Math.round(lv.xp * 0.2)
      : perfect
      ? lv.xp
      : Math.round(lv.xp * 0.7);
    const today = new Date().toISOString().slice(0, 10);

    setState((s) => {
      const newDone = { ...s.done };
      let newLvlDone = s.lvlDone;
      let newReplayed = s.replayed || 0;
      if (!failed) {
        const fi = getLevelIdx(curRM, curSecIdx, curLvlIdx);
        if (!newDone[curRM]) newDone[curRM] = [];
        if (!newDone[curRM].includes(fi)) {
          newDone[curRM] = [...newDone[curRM], fi];
          newLvlDone += 1;
        } else {
          newReplayed += 1;
        }
      }
      const newDates = [...new Set([...(s.sessionDates || []), today])].slice(-90);
      const newBestStreak = Math.max(s.bestStreak || 1, s.streak || 1);
      return {
        ...s,
        xp: s.xp + xpGain,
        lvlDone: newLvlDone,
        done: newDone,
        perfectQuiz: perfect ? s.perfectQuiz + 1 : s.perfectQuiz,
        sessionDates: newDates,
        bestStreak: newBestStreak,
        replayed: newReplayed,
      };
    });

    if (perfect) setTimeout(() => setConfetti(true), 200);
    setResultData({
      failed, perfect, masteryWarn, xpGain,
      score: correct, total: quizCount, acc, livesLeft: lives,
      wrongAnswers: wrongAnswersRef.current,
      levelName: lv.name,
    });
    setScreen("result");
  }

  function retryLesson() {
    startLesson(curRM, curSecIdx, curLvlIdx);
  }

  // ── Démarrage (depuis l'écran de bienvenue)
  function handleStart() {
    const name = usernameInput.trim() || "Joueur";
    setUsername(name);
    setHasStarted(true);
  }

  // ── Sauvegarde de la clé API
  function saveApiKey() {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) return;
    setApiKey(trimmed);
    setEditingApiKey(false);
  }

  function saveGeminiKey() {
    const trimmed = geminiKeyInput.trim();
    if (!trimmed) return;
    setGeminiKey(trimmed);
    setEditingGeminiKey(false);
  }

  // ── Sauvegarde du nom d'utilisateur
  function saveUsername() {
    const trimmed = usernameInput.trim();
    if (!trimmed) return;
    setUsername(trimmed);
    setEditingUsername(false);
  }

  // ── Google Sign-In ─────────────────────────────────────────────────────────
  useEffect(() => {
    function loadGIS() {
      if (!document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.defer = true; document.head.appendChild(s);
      }
    }
    function initGIS() {
      if (typeof google === 'undefined' || !google.accounts) return;
      tokenClientRef.current = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'profile email',
        callback: (resp) => {
          if (resp.error) return;
          setGoogleToken(resp.access_token);
          fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${resp.access_token}` } })
            .then(r => r.json()).then(u => {
              setGoogleUser(u);
              if (!username || username === "Joueur") { const n = u.given_name || u.name || "Joueur"; setUsername(n); setUsernameInput(n); }
            }).catch(() => {});
        },
      });
    }
    loadGIS();
    if (document.readyState === 'complete') { initGIS(); }
    else { window.addEventListener('load', initGIS); return () => window.removeEventListener('load', initGIS); }
  }, []);
  function googleSignIn() { if (tokenClientRef.current) tokenClientRef.current.requestAccessToken({ prompt: 'select_account' }); }
  function googleSignOut() { if (googleToken && typeof google !== 'undefined') google.accounts.oauth2.revoke(googleToken, () => {}); setGoogleToken(""); setGoogleUser(null); }

  // ─── Couleurs thème ─────────────────────────────────────────────────────────
  const bg = dark ? '#111827' : '#ffffff';
  const bg2 = dark ? '#1f2937' : '#f8fafc';
  const border = dark ? '#374151' : '#e5e7eb';
  const txt = dark ? '#f9fafb' : '#111827';
  const txt2 = dark ? '#9ca3af' : '#6b7280';

  const ThemeToggle = () => (
    <button onClick={toggleTheme}
      className="p-2 rounded-xl transition-colors"
      style={{ color: dark ? '#9ca3af' : '#6b7280', background: dark ? '#1f2937' : '#f3f4f6' }}>
      {dark ? <Sun size={17}/> : <Moon size={17}/>}
    </button>
  );

  // ─── Composants partagés ────────────────────────────────────────────────────
  // PhoneFrame adaptatif : plein écran sur mobile, carte centrée sur desktop
  const PhoneFrame = ({ children }) => (
    <div className="min-h-screen flex justify-center items-start md:items-center md:py-6 md:px-4"
      style={{ background: dark ? 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)' : 'linear-gradient(135deg,#e0e7ff 0%,#f1f5f9 100%)' }}>
      <div className="w-full md:max-w-sm md:rounded-2xl md:shadow-2xl overflow-hidden flex flex-col"
        style={{
          height: '100dvh',
          overflow: 'hidden',
          background: bg,
        }}>
        {children}
      </div>
    </div>
  );

  const BottomNav = ({ active }) => (
    <div className="flex flex-shrink-0" style={{ borderTop:`1px solid ${border}`, background: bg }}>
      {[
        { id:"home",    icon:Home,     label:t.nav.home },
        { id:"lb",      icon:Trophy,   label:t.nav.lb },
        { id:"badges",  icon:Medal,    label:t.nav.badges },
        { id:"profile", icon:User,     label:t.nav.profile },
        { id:"settings",icon:Settings, label:t.nav.settings },
      ].map(({ id, icon: Ic, label }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => navTo(id)}
            className="flex-1 pt-2 pb-1.5 px-0.5 flex flex-col items-center gap-0.5 transition-colors"
            style={{ color: isActive ? '#3b82f6' : txt2 }}>
            <Ic size={19} />
            <span style={{ fontSize:10, fontWeight: isActive ? 600 : 400 }}>{label}</span>
            {isActive && <div style={{ width:4, height:4, borderRadius:'50%', background:'#3b82f6', marginTop:1 }}/>}
          </button>
        );
      })}
    </div>
  );

  // ─── Écran de bienvenue (première utilisation) ──────────────────────────────
  const SetupScreen = () => (
    <PhoneFrame>
      <div className="flex justify-end px-4 pt-3"><ThemeToggle/></div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <div className="text-6xl mb-4">🚀</div>
        <div className="text-2xl font-bold mb-1 text-center" style={{ color: txt }}>
          Road<span style={{ color:'#3b82f6' }}>Learn</span>
        </div>
        <div className="text-sm text-center mb-8" style={{ color: txt2 }}>
          Apprends le développement, étape par étape.<br/>Aucun compte requis.
        </div>

        <div className="w-full mb-6">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: txt2 }}>
            {t.setup?.label||"Comment tu t'appelles ?"} <span style={{ color: dark?'#6b7280':'#9ca3af' }}>{t.setup?.optional||"(optionnel)"}</span>
          </label>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder={t.setup?.placeholder||"Ex : Alex"}
            autoFocus
            className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
            style={{ border:`1.5px solid ${border}`, background: bg2, color: txt }}
          />
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-3 text-sm font-semibold transition-colors"
        >
          {t.setup?.startBtn||"Commencer gratuitement →"}
        </button>

        <div className="text-xs mt-5 text-center leading-relaxed" style={{ color: txt2 }}>
          {t.setup?.noKey||"Cours générés localement · Aucune clé API nécessaire"}<br/>
          <span className="cursor-pointer" style={{ color:'#3b82f6' }} onClick={handleStart}>{t.setup?.skip||"Passer →"}</span>
        </div>
      </div>
    </PhoneFrame>
  );

  // ─── Écran d'accueil ────────────────────────────────────────────────────────
  const HomeScreen = () => (
    <PhoneFrame>
      <div className="px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ borderBottom:`1px solid ${border}` }}>
        <div className="text-lg font-bold" style={{ color: txt }}>
          Road<span style={{ color:'#3b82f6' }}>Learn</span>
        </div>
        <div className="flex gap-1.5 items-center">
          <div className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ background: dark?'#1e3a5f':'#dbeafe', color: dark?'#93c5fd':'#1e3a8a' }}>
            <Zap size={12} /><span>{state.xp} XP</span>
          </div>
          <div className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ background: dark?'#422006':'#fef3c7', color: dark?'#fbbf24':'#92400e' }}>
            <Flame size={12} /><span>{state.streak}</span>
          </div>
          <ThemeToggle/>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold flex-shrink-0"
            style={{ background: dark?'#1e3a5f':'#dbeafe', color: dark?'#93c5fd':'#1e3a8a' }}>
            {avatarLetter}
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: txt }}>{username}</div>
            <div className="text-xs mt-0.5" style={{ color: txt2 }}>{t.profile2?.lvl||"Niveau"} {ul.n} · {ul.t}</div>
          </div>
        </div>
        <div className="px-4 mb-3">
          <div className="h-1.5 rounded-full" style={{ background: dark?'#374151':'#e2e8f0' }}>
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${xpPct}%`, transition:'width 0.6s ease' }} />
          </div>
          <div className="flex justify-between text-xs mt-1" style={{ color: txt2 }}>
            <span>{state.xp} XP</span>
            <span>{ul.next} XP pour niv. {ul.n + 1}</span>
          </div>
        </div>
        {/* Stats with icons */}
        <div className="grid grid-cols-3 gap-2 px-4 mb-4">
          {[{v:state.xp,l:"XP totaux",icon:'⚡'},{v:state.lvlDone,l:t.profile2?.levels||"Niveaux",icon:'✅'},{v:`${state.streak}`,l:t.home?.streakLabel||"Jours",icon:'🔥'}].map((s,i)=>(
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: bg2, border:`1px solid ${border}` }}>
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className="text-xl font-bold" style={{ color: txt }}>{s.v}</div>
              <div className="text-xs mt-0.5" style={{ color: txt2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Streak milestone banner */}
        {[7,14,30,60,100].includes(state.streak) && (
          <div className="slide-up mx-4 mb-3 px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5"
            style={{ background:'linear-gradient(135deg,#f59e0b,#ef4444)' }}>
            <span className="text-2xl">🔥</span>
            <div>
              <div className="text-sm font-bold text-white">{state.streak} jours de série !</div>
              <div className="text-xs" style={{ color:'rgba(255,255,255,0.85)' }}>
                Incroyable — tu es vraiment assidu{state.streak>=30?' 🏆':' ⭐'}
              </div>
            </div>
          </div>
        )}

        {/* ── Reprendre (prochain niveau débloqué) ── */}
        {(() => {
          let next = null;
          for (const rm of ROADMAPS) {
            if (next) break;
            for (let si = 0; si < rm.sections.length && !next; si++) {
              for (let li = 0; li < rm.sections[si].levels.length && !next; li++) {
                if (!isDone(rm.id,si,li) && isUnlocked(rm.id,si,li))
                  next = { rm, si, li, lv: rm.sections[si].levels[li] };
              }
            }
          }
          if (!next) return null;
          return (
            <div className="px-4 mb-3.5">
              <div className="text-xs font-bold tracking-wider mb-2" style={{ color: txt2 }}>{t.home?.resume||'REPRENDRE'}</div>
              <button onClick={() => startLesson(next.rm.id, next.si, next.li)}
                className="w-full flex items-center gap-3 text-left rounded-2xl border-0 cursor-pointer"
                style={{ padding:'13px 14px', background:'linear-gradient(135deg,#3b82f6,#6366f1)', boxShadow:'0 6px 20px rgba(99,102,241,0.28)' }}>
                <div className="flex-shrink-0 flex items-center justify-center rounded-xl text-2xl"
                  style={{ width:42, height:42, background:'rgba(255,255,255,0.18)' }}>
                  {next.rm.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate mb-0.5">{next.lv.name}</div>
                  <div className="text-xs" style={{ color:'rgba(255,255,255,0.75)' }}>{next.rm.name} · +{next.lv.xp} XP</div>
                </div>
                <ChevronRight size={18} style={{ color:'rgba(255,255,255,0.8)', flexShrink:0 }} />
              </button>
            </div>
          );
        })()}

        {/* ── Daily Challenge ── */}
        {(() => {
          const dc = getDailyChallenge();
          const today = new Date().toISOString().slice(0,10);
          const dcAlreadyDone = state.dailyChallenge && state.dailyChallenge.date === today && state.dailyChallenge.done;
          const letters = ["A","B","C","D"];
          return (
            <div className="px-4 mb-3.5">
              <div className="text-xs font-bold tracking-wider mb-2" style={{ color: txt2 }}>{t.home?.daily||'DÉFI DU JOUR'}</div>
              <div className="rounded-2xl p-3.5"
                style={{ border:`1.5px solid ${dcAlreadyDone?(dark?'#059669':'#6ee7b7'):(dark?'#374151':'#e0e7ff')}`, background: dcAlreadyDone?(dark?'#064e3b':'#f0fdf4'):(dark?'#1f2937':'#fafaff') }}>
                {dcAlreadyDone ? (
                  <div className="text-center py-1.5">
                    <div className="text-3xl mb-1.5">✅</div>
                    <div className="text-sm font-semibold" style={{ color:dark?'#34d399':'#059669' }}>{t.home?.dailyDone||'Défi du jour complété !'}</div>
                    <div className="text-xs mt-1" style={{ color: txt2 }}>
                      {state.dailyChallenge.correct ? (t.home?.dailyCorrect||'+20 XP gagnés 🎉') : (t.home?.dailyWrong||'+5 XP · Reviens demain')}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-lg">⚡</span>
                      <div className="text-sm font-bold flex-1" style={{ color: txt }}>{t.home?.dailyQ||'Question du jour'}</div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background:'#eff6ff', color:'#1d4ed8' }}>+20 XP</span>
                    </div>
                    <div className="text-sm leading-relaxed mb-3" style={{ color: dark?'#d1d5db':'#374151' }}>{dc.q}</div>
                    <div className="flex flex-col gap-1.5">
                      {(dc.answers||[]).map((a,i) => {
                        let extraStyle = {};
                        if (dailyChallengeResult) {
                          if (i === dailyChallengeResult.correct) extraStyle = { background:'#f0fdf4', borderColor:'#6ee7b7', color:'#065f46' };
                          else if (i === dailyChallengeResult.chosen) extraStyle = { background:'#fff1f2', borderColor:'#fca5a5', color:'#9f1239' };
                          else extraStyle = { opacity:0.45 };
                        }
                        return (
                          <button key={i} onClick={() => handleDailyChallenge(dc, i)}
                            disabled={!!dailyChallengeResult}
                            className="flex items-center gap-2 text-left rounded-xl text-xs transition-all"
                            style={{ padding:'9px 12px', border:`1.5px solid ${dark?'#374151':'#e5e7eb'}`, background:dark?'#111827':'white', color:dark?'#d1d5db':'#374151', cursor:dailyChallengeResult?'default':'pointer', ...extraStyle }}>
                            <span className="flex items-center justify-center flex-shrink-0 text-xs font-bold rounded-full"
                              style={{ width:20, height:20, background:dark?'#374151':'#e5e7eb', color:dark?'#9ca3af':'#6b7280' }}>
                              {letters[i]}
                            </span>
                            <span>{a}</span>
                          </button>
                        );
                      })}
                    </div>
                    {dailyChallengeResult && (
                      <div className="slide-up mt-2.5 px-3 py-2.5 rounded-xl text-xs leading-relaxed"
                        style={{
                          background: dailyChallengeResult.isCorrect?(dark?'#064e3b':'#f0fdf4'):(dark?'#450a0a':'#fff1f2'),
                          border:`1px solid ${dailyChallengeResult.isCorrect?(dark?'#059669':'#6ee7b7'):(dark?'#b91c1c':'#fca5a5')}`,
                          color: dailyChallengeResult.isCorrect?(dark?'#a7f3d0':'#065f46'):(dark?'#fca5a5':'#9f1239'),
                        }}>
                        <strong>{dailyChallengeResult.isCorrect?(t.home?.ok||'✅ Bonne réponse ! +20 XP'):(t.home?.nok||'❌ Pas tout à fait… +5 XP')}</strong>
                        <div className="mt-1 opacity-90">{dailyChallengeResult.explanation}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })()}

        <div className="text-xs font-semibold tracking-wider px-4 mb-2" style={{ color: txt2 }}>
          {t.profile2?.roadmapsAvail||"ROADMAPS DISPONIBLES"}
        </div>
        <div className="px-4 pb-4 space-y-2">
          {ROADMAPS.map((rm) => {
            let total = 0;
            rm.sections.forEach((s) => (total += s.levels.length));
            const done = (state.done[rm.id] || []).length;
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <button key={rm.id} onClick={() => { setCurRM(rm.id); setScreen("levels"); }}
                className="w-full rounded-xl p-3 flex items-center gap-3 text-left transition-all"
                style={{ background: bg, border:`1px solid ${border}` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: bg2 }}>
                  {rm.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: txt }}>{rm.name}</div>
                  {rm.badge ? (
                    <div className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded-full mt-0.5"
                      style={{ background: dark?'#1e3a5f':'#dbeafe', color: dark?'#93c5fd':'#1e3a8a' }}>
                      {rm.badge}
                    </div>
                  ) : (
                    <div className="text-xs mt-0.5" style={{ color: txt2 }}>{done}/{total} {t.levels?.levels||"niveaux"}</div>
                  )}
                  <div className="h-0.5 rounded-full mt-1.5" style={{ background: dark?'#374151':'#e2e8f0' }}>
                    <div className={`h-full rounded-full ${rm.progColor}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: txt2 }} className="flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav active="home" />
    </PhoneFrame>
  );

  // ─── Classement ─────────────────────────────────────────────────────────────
  const LeaderboardScreen = () => {
    const lb = LB_INIT.map((u) =>
      u.isYou ? { ...u, xp: state.xp, n: username, av: avatarLetter } : u
    );
    const sorted = [...lb].sort((a, b) => b.xp - a.xp);
    const rankColors = ["#d97706","#6b7280","#c2410c"];
    return (
      <PhoneFrame>
        <div className="px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ borderBottom:`1px solid ${border}` }}>
          <div className="text-lg font-bold" style={{ color: txt }}>{t.lb?.title||"Classement"}</div>
          <ThemeToggle/>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {sorted.map((u, i) => (
            <div key={i} className="flex items-center gap-2.5 py-2.5 last:border-0"
              style={{
                borderBottom: u.isYou ? 'none' : `1px solid ${border}`,
                background: u.isYou ? (dark?'#1e3a5f22':'#dbeafe66') : 'transparent',
                borderRadius: u.isYou ? '10px' : '0',
                padding: u.isYou ? '8px 10px' : '10px 0',
              }}>
              <div className="w-5 text-center text-xs font-bold" style={{ color: rankColors[i]||txt2 }}>{i + 1}</div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: dark?'#374151':'#f3f4f6', color: txt }}>{u.av}</div>
              <div className="flex-1 text-sm" style={{ color: txt }}>
                {u.n}
                {u.isYou && <span className="block text-xs" style={{ color:'#3b82f6' }}>{t.lb?.you||"• Toi"}</span>}
              </div>
              <div className="text-xs font-semibold" style={{ color:'#3b82f6' }}>{u.xp} XP</div>
            </div>
          ))}
        </div>
        <BottomNav active="lb" />
      </PhoneFrame>
    );
  };

  // ─── Badges ─────────────────────────────────────────────────────────────────
  const BadgesScreen = () => {
    const earnedCount = BADGES.filter((b) => b.check(state)).length;
    return (
      <PhoneFrame>
        <div className="px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ borderBottom:`1px solid ${border}` }}>
          <div className="text-lg font-bold" style={{ color: txt }}>{t.badges?.title||"Mes badges"}</div>
          <ThemeToggle/>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-3 pt-2 text-sm" style={{ color: txt2 }}>
            {earnedCount} badge{earnedCount > 1 ? "s" : ""} {earnedCount > 1 ? (t.badges?.unlockedP||"débloqués") : (t.badges?.unlocked||"débloqué")}
          </div>
          <div className="grid grid-cols-2 gap-2.5 px-4 pb-4">
            {BADGES.map((b, i) => {
              const ok = b.check(state);
              return (
                <div key={i} className={`rounded-xl p-3 text-center transition-all ${ok?"":"opacity-40"}`}
                  style={{
                    border:`1.5px solid ${ok?'#34d399':border}`,
                    background: ok?(dark?'#064e3b33':'#ecfdf5'):bg,
                  }}>
                  <div className="text-3xl mb-1.5">{b.icon}</div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: txt }}>{b.name}</div>
                  <div className="text-xs" style={{ color: txt2 }}>{b.desc}</div>
                  {ok && (
                    <div className="text-xs font-semibold mt-1.5 flex items-center justify-center gap-0.5" style={{ color:'#059669' }}>
                      <Check size={12} /> {t.badges?.unlockedLabel||"Débloqué"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <BottomNav active="badges" />
      </PhoneFrame>
    );
  };

  // ─── Profil ─────────────────────────────────────────────────────────────────
  const ProfileScreen = () => (
    <PhoneFrame>
      <div className="px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ borderBottom:`1px solid ${border}` }}>
        <div className="text-lg font-bold" style={{ color: txt }}>Profil</div>
        <ThemeToggle/>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2"
            style={{ background: dark?'#1e3a5f':'#dbeafe', color: dark?'#93c5fd':'#1e3a8a' }}>
            {avatarLetter}
          </div>
          {editingUsername ? (
            <div className="flex items-center gap-2 justify-center mt-1">
              <input type="text" value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveUsername()} autoFocus
                className="rounded-lg px-2 py-1 text-sm text-center focus:outline-none w-36"
                style={{ border:`1.5px solid #3b82f6`, background: bg2, color: txt }}/>
              <button onClick={saveUsername} style={{ color:'#059669' }}><Check size={16} /></button>
              <button onClick={() => { setEditingUsername(false); setUsernameInput(username); }} style={{ color: txt2 }}><X size={16} /></button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 justify-center">
              <div className="text-base font-semibold" style={{ color: txt }}>{username}</div>
              <button onClick={() => { setEditingUsername(true); setUsernameInput(username); }} style={{ color: txt2 }}><Edit2 size={13} /></button>
            </div>
          )}
          <div className="text-xs mt-1" style={{ color: txt2 }}>{t.profile2?.lvl||"Niveau"} {ul.n} · {ul.t}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 mb-4">
          {[{v:state.xp,l:"XP"},{v:state.lvlDone,l:t.profile2?.levels||"Niveaux"},{v:Object.keys(state.done).filter(k=>(state.done[k]||[]).length>0).length,l:t.profile2?.roadmaps||"Roadmaps"}].map((s,i)=>(
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: bg2, border:`1px solid ${border}` }}>
              <div className="text-lg font-bold" style={{ color: txt }}>{s.v}</div>
              <div className="text-xs mt-0.5" style={{ color: txt2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="text-xs font-semibold tracking-wider px-4 mb-2" style={{ color: txt2 }}>{t.profile2?.progression||"PROGRESSION"}</div>
        <div className="px-4 mb-4">
          {ROADMAPS.map((rm) => {
            let total = 0; rm.sections.forEach((s) => (total += s.levels.length));
            const done = (state.done[rm.id] || []).length;
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <div key={rm.id} className="flex items-center gap-2.5 py-2 last:border-0" style={{ borderBottom:`1px solid ${border}` }}>
                <span className="text-lg">{rm.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium mb-1" style={{ color: txt }}>{rm.name}</div>
                  <div className="h-1 rounded-full" style={{ background: dark?'#374151':'#e2e8f0' }}>
                    <div className={`h-full rounded-full ${rm.progColor}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: txt2 }}>{done}/{total}</span>
              </div>
            );
          })}
        </div>

        {/* ── Heatmap activité (60 derniers jours) ── */}
        <div className="text-xs font-semibold tracking-wider px-4 mb-2" style={{ color: txt2 }}>{t.home?.activity||"ACTIVITÉ"}</div>
        <div className="mx-4 mb-5 p-3.5 rounded-2xl" style={{ background: bg2, border:`1px solid ${border}` }}>
          <div className="flex justify-between mb-3">
            {[{v:`${state.streak||1}🔥`,l:t.home?.streakCurrent||"Série actuelle"},{v:`${state.bestStreak||1}🏅`,l:t.home?.streakBest||"Meilleure série"},{v:(state.sessionDates||[]).length,l:t.home?.activeDays||"Jours actifs"}].map((s,i)=>(
              <div key={i} className="text-center">
                <div className="text-lg font-bold" style={{ color: txt }}>{s.v}</div>
                <div className="text-xs" style={{ color: txt2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-0.5">
            {Array.from({length:60},(_,i)=>{
              const d=new Date(); d.setDate(d.getDate()-(59-i));
              const key=d.toISOString().slice(0,10);
              const active=(state.sessionDates||[]).includes(key);
              const isToday=key===new Date().toISOString().slice(0,10);
              return <div key={i} style={{width:10,height:10,borderRadius:3,transition:'background 0.2s',background:active?(dark?'#3b82f6':'#3b82f6'):(dark?'#374151':'#e5e7eb'),opacity:active?1:0.5,outline:isToday?`2px solid ${dark?'#60a5fa':'#1d4ed8'}`:'none',outlineOffset:1}}/>;
            })}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs" style={{ color: txt2 }}>{t.home?.ago60||"Il y a 60j"}</span>
            <span className="text-xs" style={{ color: txt2 }}>{t.home?.today||"Aujourd'hui"}</span>
          </div>
        </div>

        <div className="text-xs font-semibold tracking-wider px-4 mb-2" style={{ color: txt2 }}>{t.profile2?.params||"PARAMÈTRES"}</div>
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between rounded-xl p-3" style={{ border:`1px solid ${border}`, background: bg }}>
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: txt }}>
              {dark ? <Sun size={15}/> : <Moon size={15}/>}
              {(t.profile2?.theme||"Thème")} {dark?(t.profile2?.dark||"sombre"):(t.profile2?.light||"clair")}
            </div>
            <button onClick={toggleTheme} className="relative w-11 h-6 rounded-full transition-colors"
              style={{ background: dark?'#3b82f6':'#d1d5db' }}>
              <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                style={{ left: dark?'22px':'2px' }}/>
            </button>
          </div>
        </div>
        <div className="px-4 pb-6">
          <div className="rounded-xl p-3" style={{ border:`1px solid ${border}`, background: bg }}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: txt }}>
                <Key size={14} style={{ color: txt2 }}/> {t.profile2?.apiKey||"Clé API Anthropic"}
              </div>
              <button onClick={() => { setEditingApiKey((v) => !v); setApiKeyInput(apiKey); setShowApiKey(false); }}
                className="text-xs font-semibold" style={{ color:'#3b82f6' }}>
                {editingApiKey ? (t.profile2?.cancel||"Annuler") : (t.profile2?.modify||"Modifier")}
              </button>
            </div>
            {editingApiKey ? (
              <div className="mt-2">
                <div className="relative mb-2">
                  <input type={showApiKey ? "text" : "password"} value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)} placeholder="sk-ant-api03-..."
                    className="w-full rounded-lg px-3 py-2 pr-9 text-xs focus:outline-none"
                    style={{ border:`1.5px solid ${border}`, background: bg2, color: txt }}/>
                  <button onClick={() => setShowApiKey((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: txt2 }}>
                    {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <button onClick={saveApiKey} disabled={!apiKeyInput.trim()}
                  className="w-full bg-blue-600 text-white rounded-lg py-2 text-xs font-semibold disabled:opacity-40">
                  {t.profile2?.save||"Enregistrer"}
                </button>
              </div>
            ) : (
              <div className="text-xs font-mono" style={{ color: txt2 }}>
                {apiKey ? `${apiKey.slice(0, 10)}${"•".repeat(12)}` : (t.profile2?.notConfigured||"Non configurée")}
              </div>
            )}
            {/* ── Google Sign-In ──────────────────────────────────────────── */}
            <div className="rounded-xl p-3 mt-3" style={{ border:`1px solid ${border}`, background: bg2 }}>
              <div style={{fontSize:11, fontWeight:700, color:dark?'#6b7280':'#9ca3af', letterSpacing:'0.06em', marginBottom:8}}>COMPTE GOOGLE</div>
              {googleUser ? (
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <img src={googleUser.picture} style={{width:30, height:30, borderRadius:'50%', border:'2px solid #3b82f6'}} alt=""/>
                    <div>
                      <div style={{fontSize:12, fontWeight:600, color:dark?'#f9fafb':'#111827'}}>{googleUser.name}</div>
                      <div style={{fontSize:10, color:dark?'#6b7280':'#9ca3af'}}>{googleUser.email}</div>
                    </div>
                  </div>
                  <button onClick={googleSignOut} style={{fontSize:11, color:'#ef4444', background:'none', border:'none', cursor:'pointer', fontWeight:600}}>{(L_GOOGLE[lang]||L_GOOGLE.fr).signOut}</button>
                </div>
              ) : (
                <button onClick={googleSignIn} style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:9, background:'white', border:'1.5px solid #e5e7eb', borderRadius:10, padding:'9px 14px', fontSize:13, fontWeight:600, cursor:'pointer', color:'#374151', boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  {(L_GOOGLE[lang]||L_GOOGLE.fr).signIn}
                </button>
              )}
              {googleUser && !geminiKey && (
                <div style={{marginTop:8, padding:'7px 10px', borderRadius:8, background:dark?'#1c2340':'#eff6ff', border:`1px solid ${dark?'#2d3a6e':'#bfdbfe'}`}}>
                  <div style={{fontSize:11, color:dark?'#93c5fd':'#1d4ed8'}}>💡 {(L_GOOGLE[lang]||L_GOOGLE.fr).setup} →</div>
                </div>
              )}
            </div>
            <div className="rounded-xl p-3 mt-3" style={{ border:`1px solid ${border}`, background: bg2 }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: txt }}>
                  <span>🤖</span> {(L_GEMINI[lang]||L_GEMINI.fr).label}
                </div>
                <button onClick={() => { setEditingGeminiKey(v => !v); setGeminiKeyInput(geminiKey); }}
                  className="text-xs font-semibold" style={{ color:'#3b82f6' }}>
                  {editingGeminiKey ? (t.profile2?.cancel||"Annuler") : (t.profile2?.modify||"Modifier")}
                </button>
              </div>
              {editingGeminiKey ? (
                <div className="mt-2">
                  <input type="text" value={geminiKeyInput} onChange={e => setGeminiKeyInput(e.target.value)}
                    placeholder={(L_GEMINI[lang]||L_GEMINI.fr).placeholder}
                    className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none mb-2"
                    style={{ border:`1.5px solid ${border}`, background: bg, color: txt }}/>
                  <button onClick={saveGeminiKey} disabled={!geminiKeyInput.trim()}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 text-xs font-semibold disabled:opacity-40">
                    {t.profile2?.save||"Enregistrer"}
                  </button>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer"
                    className="block text-center text-xs mt-2" style={{ color:'#3b82f6' }}>
                    {(L_GEMINI[lang]||L_GEMINI.fr).get}
                  </a>
                </div>
              ) : (
                <div className="text-xs font-mono" style={{ color: txt2 }}>
                  {geminiKey ? `${geminiKey.slice(0,10)}${"•".repeat(12)}` : (L_GEMINI[lang]||L_GEMINI.fr).notConfigured}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </PhoneFrame>
  );

  // ─── Niveaux d'une roadmap ───────────────────────────────────────────────────
  const LevelsScreen = () => {
    const rm = ROADMAPS.find((r) => r.id === curRM);
    if (!rm) return null;
    return (
      <PhoneFrame>
        <div className="px-4 py-3 flex items-center gap-2.5 flex-shrink-0" style={{ borderBottom:`1px solid ${border}` }}>
          <button onClick={() => navTo("home")} className="p-1 transition-colors" style={{ color: txt }}>
            <ArrowLeft size={20} />
          </button>
          <div className="text-base font-bold flex-1" style={{ color: txt }}>{rm.icon} {rm.name}</div>
          <div className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ background: dark?'#1e3a5f':'#dbeafe', color: dark?'#93c5fd':'#1e3a8a' }}>
            <Zap size={11} /><span>{state.xp}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {rm.sections.map((sec, si) => (
            <div key={si} className="mb-4">
              <div className="text-xs font-semibold tracking-wider mb-2 mt-3" style={{ color: txt2 }}>
                {sec.title}
              </div>
              {sec.levels.map((lv, li) => {
                const fi = getLevelIdx(curRM, si, li);
                const done = isDone(curRM, si, li);
                const unlocked = isUnlocked(curRM, si, li);
                const clickable = unlocked || done;
                const isCur = !done && unlocked;
                const typeLabel = lv.type.includes("code") ? (t.levels?.code||"Code") : lv.type.includes("theory") ? (t.levels?.theory||"Théorie + Quiz") : (t.levels?.quiz||"Quiz");
                return (
                  <React.Fragment key={li}>
                    <button onClick={() => clickable && startLesson(curRM, si, li)} disabled={!clickable}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left mb-1 transition-all ${!clickable ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                      style={{
                        background: bg,
                        border: done ? '1.5px solid #34d399' : isCur ? '2px solid #3b82f6' : `1px solid ${border}`,
                      }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: done?(dark?'#064e3b':'#d1fae5'):isCur?(dark?'#1e3a5f':'#dbeafe'):(dark?'#374151':'#f3f4f6'),
                          color: done?'#059669':isCur?'#3b82f6':txt2,
                        }}>
                        {done ? <Check size={16} /> : unlocked ? <span className="text-xs font-semibold">{fi + 1}</span> : <Lock size={13} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate" style={{ color: txt }}>{lv.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: txt2 }}>
                          {typeLabel} · {lv.xp} XP
                          {done && <span className="ml-1" style={{ color:'#059669' }}>{t.levels?.replay||"· Rejouer"}</span>}
                        </div>
                      </div>
                      <div className="text-xs font-semibold flex-shrink-0">
                        {done ? <RefreshCw size={14} style={{ color:'#059669' }} /> : <span style={{ color:'#3b82f6' }}>+{lv.xp} XP</span>}
                      </div>
                    </button>
                    {li < sec.levels.length - 1 && (
                      <div className="w-0.5 h-2 ml-7 rounded-full" style={{ background: done?'#34d399':border }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </PhoneFrame>
    );
  };

  // ─── Leçon ──────────────────────────────────────────────────────────────────
  const LessonScreen = () => {
    const total = steps.length || 7;
    const pct = Math.round((stepIdx / total) * 100);
    const step = steps[stepIdx];
    const letters = ["A", "B", "C", "D"];

    return (
      <PhoneFrame>
        <div className="px-4 pt-3 pb-2.5 flex-shrink-0" style={{ borderBottom:`1px solid ${border}` }}>
          <div className="flex items-center gap-2 mb-1.5">
            <button onClick={() => setScreen("levels")} className="p-1 transition-colors" style={{ color: txt }}>
              <X size={18} />
            </button>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: dark?'#374151':'#e2e8f0' }}>
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%`, transition:'width 0.6s ease' }} />
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <Heart key={i} size={14}
                  style={{ color: i>lives?(dark?'#4b5563':'#d1d5db'):'#f43f5e' }}
                  fill={i > lives ? "none" : "currentColor"}/>
              ))}
            </div>
          </div>
          <div className="text-xs" style={{ color: txt2 }}>
            {loading ? (t.lesson?.loading || "Chargement…") : step?.type === "theory" ? `${t.lesson?.lessonOf||"Leçon"} ${stepIdx+1}/${total}` : `${t.lesson?.questionOf||"Question"} ${stepIdx+1}/${total}`}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-12 text-sm" style={{ color: txt2 }}>
              <Loader2 className="mx-auto mb-3 animate-spin" style={{ color:'#3b82f6' }} size={28} />
              {t.lesson?.loading || "Génération du cours…"}
              <div className="text-xs mt-2" style={{ color: txt2 }}>{t.lesson?.loadingWait || "Cela peut prendre quelques secondes"}</div>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-sm" style={{ color: txt }}>
              <AlertCircle className="mx-auto mb-3" style={{ color:'#ef4444' }} size={28} />
              <div className="font-semibold mb-1">{t.lesson?.errorTitle || "Erreur de génération"}</div>
              <div className="text-xs mb-4 px-2" style={{ color: txt2 }}>{error}</div>
              <button onClick={retryLesson} className="bg-blue-600 text-white rounded-xl py-3 px-6 text-sm font-semibold">{t.lesson?.retry || "Réessayer"}</button>
              <button onClick={() => setScreen("levels")} className="block mx-auto mt-2 text-sm py-2" style={{ color: txt2 }}>{t.lesson?.back || "Retour"}</button>
            </div>
          )}

          {needsApiKey && (
            <div className="flex flex-col items-center py-10 gap-3 text-center">
              <div style={{ fontSize:40 }}>🔑</div>
              <div className="font-semibold text-sm" style={{ color: txt }}>{(L_GEMINI[lang]||L_GEMINI.fr).required}</div>
              <div className="text-xs px-4" style={{ color: txt2 }}>{(L_GEMINI[lang]||L_GEMINI.fr).requiredDesc}</div>
              <button onClick={() => { setNeedsApiKey(false); setScreen("profile"); setTab("profile"); }}
                className="rounded-xl py-2.5 px-6 text-xs font-semibold mt-2 bg-blue-600 text-white">
                {t.nav?.profile||"Profil"}
              </button>
              <button onClick={() => setScreen("levels")} className="text-xs mt-1" style={{ color: txt2, background:'none', border:'none', cursor:'pointer' }}>
                {t.lesson?.back || "Retour"}
              </button>
            </div>
          )}

          {!loading && !error && step && step.type === "theory" && (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md"
                  style={{ background: dark?'#1e3a5f':'#dbeafe', color: dark?'#93c5fd':'#1e3a8a' }}>
                  <BookOpen size={11} /> {t.lesson?.theory || "Théorie"}
                </div>
                {typeof window !== 'undefined' && window.speechSynthesis && (
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => speakText(step.content)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors"
                      style={{ background: ttsPlaying?(dark?'#1e3a5f':'#dbeafe'):(dark?'#374151':'#f3f4f6'), color: ttsPlaying?'#3b82f6':txt2 }}>
                      🔊 {ttsPlaying ? t.tts.stop : t.tts.listen}
                    </button>
                    {[{v:0.65,l:'¾'},{v:0.9,l:'1×'},{v:1.15,l:'1¼'},{v:1.4,l:'1½'}].map(({v,l})=>(
                      <button key={v} onClick={()=>changeTtsSpeed(v)}
                        className="text-xs font-semibold rounded"
                        style={{ padding:'2px 6px', border:`1px solid ${ttsSpeed===v?'#3b82f6':border}`, background:ttsSpeed===v?'#3b82f6':(dark?'#374151':'#f3f4f6'), color:ttsSpeed===v?'white':txt2, cursor:'pointer' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-r-xl border-l-4 border-blue-500 p-3 text-sm leading-relaxed mb-4"
                style={{ background: bg2, color: txt }}>
                {step.content}
              </div>
              <button onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.97] text-white rounded-xl py-3 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">
                {t.lesson?.understood || "J'ai compris →"}
              </button>
            </>
          )}

          {!loading && !error && step && step.type !== "theory" && (
            <>
              {steps[0]?.content && (
                <div className="mb-3 rounded-xl overflow-hidden" style={{ border:`1px solid ${border}` }}>
                  <button onClick={() => setShowTheory(v => !v)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold"
                    style={{ background: bg2, color: txt2 }}>
                    <span>📖 {t.tts.tip}</span>
                    <span style={{ fontSize:10 }}>{showTheory ? '▲' : '▼'}</span>
                  </button>
                  {showTheory && (
                    <div className="px-3 py-2 text-xs leading-relaxed" style={{ background: bg, color: txt2, borderTop:`1px solid ${border}` }}>
                      {steps[0].content}
                    </div>
                  )}
                </div>
              )}
              <div className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md mb-3"
                style={{
                  background: step.type==="code"?(dark?'#2e1065':'#f3e8ff'):step.type==="challenge"?(dark?'#431407':'#fff7ed'):(dark?'#064e3b':'#ecfdf5'),
                  color: step.type==="code"?(dark?'#c4b5fd':'#6b21a8'):step.type==="challenge"?(dark?'#fb923c':'#c2410c'):(dark?'#34d399':'#065f46'),
                }}>
                {step.type === "code" ? <><Code2 size={11} /> {t.lesson?.code||"Code"}</> : step.type === "challenge" ? <><Target size={11} /> {t.lesson?.challenge||"Défi"}</> : <><Sparkles size={11} /> {t.lesson?.quiz||"Quiz"}</>}
              </div>
              <div className="text-base font-semibold leading-relaxed mb-3.5" style={{ color: txt }}>{step.q}</div>
              {step.snippet && (
                <pre className="rounded-xl p-3 text-xs font-mono mb-3.5 overflow-x-auto" style={{ background:'#0f172a', color:'#86efac' }}>
                  {step.snippet}
                </pre>
              )}
              <div className="space-y-2 mb-4">
                {(step.answers || []).map((a, i) => {
                  const isSelected = selectedAns === i;
                  const isCorrect = i === step.correct;
                  let btnBg=bg, btnBorder=border, btnColor=txt, letterBg=bg2, letterColor=txt2;
                  if (answered) {
                    if (isCorrect) { btnBg=dark?'#064e3b33':'#ecfdf5'; btnBorder='#34d399'; btnColor=dark?'#6ee7b7':'#065f46'; letterBg='#059669'; letterColor='#fff'; }
                    else if (isSelected) { btnBg=dark?'#4c0519':'#fff1f2'; btnBorder='#f43f5e'; btnColor=dark?'#fda4af':'#9f1239'; letterBg='#e11d48'; letterColor='#fff'; }
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                      className="w-full text-left p-3 rounded-xl text-sm flex items-center gap-2.5 transition-all hover:scale-[1.005] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:hover:scale-100"
                      style={{ background: btnBg, border:`1.5px solid ${btnBorder}`, color: btnColor }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                        style={{ background: letterBg, color: letterColor }}>{letters[i]}</span>
                      <span className="flex-1">{a}</span>
                    </button>
                  );
                })}
              </div>
              {answered && (
                <>
                  <div className="rounded-xl p-3 text-xs leading-relaxed mb-3"
                    style={{
                      background: selectedAns===step.correct?(dark?'#064e3b33':'#ecfdf5'):(dark?'#4c0519':'#fff1f2'),
                      border: `1.5px solid ${selectedAns===step.correct?'#34d399':'#f43f5e'}`,
                      color: selectedAns===step.correct?(dark?'#6ee7b7':'#065f46'):(dark?'#fda4af':'#9f1239'),
                    }}>
                    <div className="font-semibold text-sm mb-1">
                      {selectedAns === step.correct ? (t.lesson?.goodAnswer||"✅ Bonne réponse !") : (t.lesson?.wrongAnswer||"❌ Pas tout à fait…")}
                    </div>
                    {step.explanation}
                  </div>
                  <button onClick={nextStep}
                    className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition-all active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 ${lives===0?"bg-rose-600 hover:bg-rose-500":"bg-blue-600 hover:bg-blue-500"}`}>
                    {lives===0 ? (t.lesson?.seeResult||"Voir le résultat →") : stepIdx+1>=steps.length ? (t.lesson?.finish||"Terminer →") : (t.lesson?.continueBtn||"Continuer →")}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </PhoneFrame>
    );
  };

  // ─── Résultat ────────────────────────────────────────────────────────────────
  const ResultScreen = () => {
    const r = resultData;
    if (!r) return null;
    const letters = ["A", "B", "C", "D"];
    const xpBg    = r.failed ? (dark?'#450a0a':'#fff1f2') : r.perfect ? (dark?'#064e3b':'#f0fdf4') : (dark?'#1e3a5f':'#eff6ff');
    const xpColor = r.failed ? (dark?'#fca5a5':'#be185d') : r.perfect ? (dark?'#34d399':'#059669') : (dark?'#60a5fa':'#1d4ed8');
    const xpBorder= r.failed ? (dark?'#b91c1c':'#fecdd3') : r.perfect ? (dark?'#059669':'#6ee7b7') : (dark?'#1e40af':'#bfdbfe');

    function handleShare() {
      const medal = r.perfect ? '🏆' : r.failed ? '💪' : '⭐';
      const text = `${medal} RoadLearn — "${r.levelName}"\n✅ ${r.score}/${r.total} · 🎯 ${r.acc}% · ⚡ +${r.xpGain} XP\n\n📱 Essaie RoadLearn !`;
      if (navigator.share) { navigator.share({ title: 'RoadLearn', text }).catch(() => {}); }
      else { navigator.clipboard?.writeText(text).then(() => alert('Résultat copié ! 📋')).catch(() => {}); }
    }

    return (
      <PhoneFrame>
        {confetti && <ConfettiOverlay />}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center text-center"
          style={{ background: bg }}>
          <div className="text-6xl mb-3 bounce-in" style={{ marginTop: 8 }}>{r.failed ? "💔" : r.perfect ? "🏆" : "⭐"}</div>
          <div className="text-xl font-medium mb-1.5" style={{ color: txt }}>
            {r.failed ? (t.result?.tryAgain||"Essaie encore !") : r.perfect ? (t.result?.perfect||"Parfait !") : (t.result?.levelDone||"Niveau terminé !")}
          </div>
          <div className="text-sm mb-5" style={{ color: txt2 }}>
            {r.total} questions · {r.failed ? (t.result?.courage||"Courage !") : r.perfect ? (t.result?.allCorrect||"100% correct !") : (t.result?.keep||"Continue comme ça !")}
          </div>

          {/* XP Card */}
          <div className="rounded-2xl py-4 px-8 mb-4 w-full slide-up"
            style={{ background: xpBg, border: `1.5px solid ${xpBorder}` }}>
            <div className="text-4xl font-black" style={{ color: xpColor }}>+{r.xpGain}</div>
            <div className="text-xs mt-1 font-semibold opacity-80" style={{ color: xpColor }}>XP gagnés</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 w-full slide-up">
            {[{v:`${r.score}/${r.total}`,l:"Bonnes",i:'✅'},{v:`${r.acc}%`,l:"Précision",i:'🎯'},{v:`${r.livesLeft}/3`,l:"Vies",i:'❤️'}].map((s,idx)=>(
              <div key={idx} className="rounded-xl py-2.5 px-1.5 text-center" style={{ background: bg2, border: `1px solid ${border}` }}>
                <div className="text-lg mb-1">{s.i}</div>
                <div className="text-sm font-bold" style={{ color: txt }}>{s.v}</div>
                <div className="text-xs mt-0.5" style={{ color: txt2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Mastery Gate warning */}
          {r.masteryWarn && (
            <div className="w-full rounded-xl p-3 mb-3 text-left slide-up"
              style={{ background: dark?'#451a03':'#fff7ed', border: `1.5px solid ${dark?'#92400e':'#fcd34d'}` }}>
              <div className="text-xs font-bold mb-1" style={{ color: dark?'#fbbf24':'#b45309' }}>⚠️ Score insuffisant ({r.acc}%)</div>
              <div className="text-xs leading-relaxed" style={{ color: dark?'#d97706':'#92400e' }}>
                Moins de 70% de réussite. Rejoue ce niveau pour vraiment maîtriser le sujet !
              </div>
            </div>
          )}

          {/* Revoir les erreurs */}
          {r.wrongAnswers && r.wrongAnswers.length > 0 && (
            <div className="w-full mb-3">
              <button onClick={() => setShowErrorReview(v => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                style={{ background: bg2, border: `1px solid ${border}`, color: txt2 }}>
                <span>❌ {r.wrongAnswers.length} erreur{r.wrongAnswers.length > 1 ? 's' : ''} · Revoir</span>
                <span style={{ transform: showErrorReview ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>
              {showErrorReview && (
                <div className="mt-2 flex flex-col gap-2 slide-up">
                  {r.wrongAnswers.map((w, wi) => (
                    <div key={wi} className="rounded-xl p-3 text-left"
                      style={{ background: bg2, border: `1.5px solid ${border}` }}>
                      <div className="text-xs font-semibold mb-2" style={{ color: txt }}>{w.q}</div>
                      <div className="flex flex-col gap-1">
                        {(w.answers || []).map((a, ai) => (
                          <div key={ai} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs"
                            style={{
                              background: ai===w.correct?(dark?'#064e3b':'#f0fdf4'):ai===w.chosen?(dark?'#450a0a':'#fff1f2'):'transparent',
                              border: `1px solid ${ai===w.correct?(dark?'#059669':'#6ee7b7'):ai===w.chosen?(dark?'#b91c1c':'#fca5a5'):'transparent'}`,
                              color: ai===w.correct?(dark?'#a7f3d0':'#065f46'):ai===w.chosen?(dark?'#fca5a5':'#9f1239'):(dark?'#9ca3af':'#6b7280'),
                            }}>
                            <span>{ai===w.correct?'✅':ai===w.chosen?'❌':'○'}</span>
                            <span>{letters[ai]} · {a}</span>
                          </div>
                        ))}
                      </div>
                      {w.explanation && (
                        <div className="mt-2 text-xs italic leading-relaxed" style={{ color: txt2 }}>💡 {w.explanation}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Badges débloqués */}
          {(() => {
            const nb = BADGES.filter(b => b.check(state));
            if (!nb.length) return null;
            return (
              <div className="w-full rounded-xl p-3 mb-3 text-left slide-up"
                style={{ background: dark?'#451a0340':'#fffbeb', border: `1.5px solid ${dark?'#b45309':'#fcd34d'}` }}>
                <div className="text-xs font-medium mb-1" style={{ color: dark?'#fcd34d':'#92400e' }}>🎉 {t.result?.badgesAvail||"Badges disponibles"}</div>
                <div className="flex gap-2 flex-wrap">
                  {nb.slice(0, 3).map((b, i) => <span key={i} className="text-sm" style={{ color: txt }}>{b.icon} {b.name}</span>)}
                </div>
              </div>
            );
          })()}

          {/* Boutons */}
          <div className="space-y-2 w-full slide-up">
            <button onClick={() => setScreen("levels")}
              className="w-full rounded-xl py-3.5 text-sm font-semibold"
              style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 6px 20px rgba(59,130,246,0.3)' }}>
              {r.failed ? "Réessayer 💪" : r.masteryWarn ? "Rejouer pour maîtriser 🔁" : (t.result?.continueBtn||"Continuer →")}
            </button>
            <button onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium"
              style={{ background: bg2, border: `1.5px solid ${border}`, color: txt }}>
              <Share2 size={15}/> Partager mon résultat
            </button>
            <button onClick={() => navTo("home")}
              className="w-full py-2 text-xs" style={{ background: 'none', border: 'none', color: txt2, cursor: 'pointer' }}>
              {t.result?.homeBtn||"Accueil"}
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  };

  // ─── Écran paramètres ────────────────────────────────────────────────────────
  const [notifPerm, setNotifPerm] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  async function requestNotifPerm() {
    if (typeof Notification === 'undefined') return;
    const perm = await Notification.requestPermission();
    setNotifPerm(perm);
    if (perm === 'granted') saveNotif({ ...notifSettings, global: true });
  }

  const SettingsScreen = () => {

    // Toggle iOS générique
    const Toggle = ({ value, onChange, disabled }) => (
      <div onClick={() => !disabled && onChange(!value)}
        className="relative flex-shrink-0"
        style={{
          width:44, height:26, borderRadius:13, cursor: disabled ? 'not-allowed' : 'pointer',
          background: value ? '#3b82f6' : (dark ? '#374151' : '#d1d5db'),
          transition:'background 0.2s', opacity: disabled ? 0.5 : 1,
        }}>
        <div style={{
          position:'absolute', top:3, left: value ? 21 : 3,
          width:20, height:20, borderRadius:'50%', background:'#fff',
          boxShadow:'0 1px 3px rgba(0,0,0,0.3)', transition:'left 0.2s',
        }}/>
      </div>
    );

    const Section = ({ title, children }) => (
      <div className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-1"
          style={{ color:txt2 }}>{title}</div>
        <div className="rounded-2xl overflow-hidden" style={{ background:bg2, border:`1px solid ${border}` }}>
          {children}
        </div>
      </div>
    );

    const Row = ({ label, sublabel, right, last }) => (
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: last ? 'none' : `1px solid ${border}` }}>
        <div className="flex-1 pr-3">
          <div className="text-sm" style={{ color:txt }}>{label}</div>
          {sublabel && <div className="text-xs mt-0.5" style={{ color:txt2 }}>{sublabel}</div>}
        </div>
        {right}
      </div>
    );

    const LANGS = [
      { code:'fr', flag:'🇫🇷', name:'Français' },
      { code:'en', flag:'🇬🇧', name:'English' },
      { code:'es', flag:'🇪🇸', name:'Español' },
      { code:'pt', flag:'🇧🇷', name:'Português' },
      { code:'de', flag:'🇩🇪', name:'Deutsch' },
      { code:'it', flag:'🇮🇹', name:'Italiano' },
      { code:'nl', flag:'🇳🇱', name:'Nederlands' },
      { code:'ja', flag:'🇯🇵', name:'日本語' },
    ];

    return (
      <PhoneFrame>
        <div className="px-4 py-3 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom:`1px solid ${border}` }}>
          <div className="text-lg font-bold" style={{ color:txt }}>{t.settings.title}</div>
          <ThemeToggle/>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 fade-in">

          {/* ── Langue */}
          <Section title={t.settings.lang}>
            <div className="p-3 grid gap-2" style={{ gridTemplateColumns:'repeat(4,1fr)' }}>
              {LANGS.map(({ code, flag, name }) => (
                <button key={code} onClick={() => changeLang(code)}
                  className="py-2.5 rounded-xl text-xs font-semibold transition-all text-center"
                  style={{
                    background: lang === code ? '#3b82f6' : bg,
                    color:      lang === code ? '#fff' : txt,
                    border:`1.5px solid ${lang === code ? '#3b82f6' : border}`,
                  }}>
                  <div>{flag}</div>
                  <div className="mt-0.5" style={{ fontSize:9 }}>{name}</div>
                </button>
              ))}
            </div>
          </Section>

          {/* ── Apparence */}
          <Section title={t.settings.appearance}>
            <Row label={t.settings.darkMode} right={
              <Toggle value={dark} onChange={toggleTheme}/>
            }/>
            {'speechSynthesis' in window && (
              <Row label={TTS_SPEED_LABEL[lang]||'Vitesse TTS'} sublabel={TTS_SPEED_SUB[lang]||'Vitesse de la synthèse vocale'} last right={
                <div className="flex gap-1">
                  {[{v:0.65,l:'0.75×'},{v:0.9,l:'1×'},{v:1.15,l:'1.25×'},{v:1.4,l:'1.5×'}].map(({v,l})=>(
                    <button key={v} onClick={()=>changeTtsSpeed(v)}
                      className="text-xs font-semibold rounded-lg transition-all"
                      style={{ padding:'4px 8px', border:`1.5px solid ${ttsSpeed===v?'#3b82f6':border}`, background:ttsSpeed===v?'#3b82f6':bg, color:ttsSpeed===v?'white':txt2, cursor:'pointer' }}>
                      {l}
                    </button>
                  ))}
                </div>
              }/>
            )}
          </Section>

          {/* ── Notifications */}
          <Section title={t.settings.notifications}>
            {notifPerm !== 'granted' && (
              <div className="px-4 py-3" style={{ borderBottom:`1px solid ${border}` }}>
                <button onClick={requestNotifPerm}
                  className="w-full rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2"
                  style={{ background:'#3b82f6', color:'#fff' }}>
                  <Bell size={15}/> {t.settings.notifPerm}
                </button>
              </div>
            )}
            <Row label={t.settings.notifGlobal}
              sublabel={notifPerm !== 'granted' ? '⚠️ Permission requise' : null}
              right={<Toggle
                value={notifSettings.global && notifPerm === 'granted'}
                disabled={notifPerm !== 'granted'}
                onChange={v => saveNotif({ ...notifSettings, global: v })}
              />}
            />
            <Row label={t.settings.notifLesson}
              right={<Toggle
                value={notifSettings.global && notifSettings.lesson}
                disabled={!notifSettings.global}
                onChange={v => saveNotif({ ...notifSettings, lesson: v })}
              />}
            />
            <Row label={t.settings.notifStreak}
              right={<Toggle
                value={notifSettings.global && notifSettings.streak}
                disabled={!notifSettings.global}
                onChange={v => saveNotif({ ...notifSettings, streak: v })}
              />}
            />
            <Row label={t.settings.notifLb}
              right={<Toggle
                value={notifSettings.global && notifSettings.lb}
                disabled={!notifSettings.global}
                onChange={v => saveNotif({ ...notifSettings, lb: v })}
              />}
            />
            <Row label={t.settings.notifTime} last right={
              <input type="time" value={notifSettings.time}
                disabled={!notifSettings.global}
                onChange={e => saveNotif({ ...notifSettings, time: e.target.value })}
                style={{
                  background:bg, color:txt, border:`1px solid ${border}`,
                  borderRadius:8, padding:'4px 8px', fontSize:13,
                  opacity: notifSettings.global ? 1 : 0.4,
                }}
              />
            }/>
          </Section>

          {/* ── Infos */}
          <div className="text-center text-xs mt-2 pb-4" style={{ color:txt2 }}>
            RoadLearn · {t.settings.version} 2.0 · Best streak: {state.bestStreak||1}🏅
          </div>
        </div>

        <BottomNav active="settings"/>
      </PhoneFrame>
    );
  };

  // ─── Rendu principal ─────────────────────────────────────────────────────────
  if (!hasStarted) return <SetupScreen />;

  if (screen === "home") return <HomeScreen />;
  if (screen === "lb") return <LeaderboardScreen />;
  if (screen === "badges") return <BadgesScreen />;
  if (screen === "profile") return <ProfileScreen />;
  if (screen === "levels") return <LevelsScreen />;
  if (screen === "lesson") return <LessonScreen />;
  if (screen === "result") return <ResultScreen />;
  if (screen === "settings") return <SettingsScreen />;
  return <HomeScreen />;
}
