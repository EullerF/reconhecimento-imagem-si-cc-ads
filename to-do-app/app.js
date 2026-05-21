// DB simulation via localStorage

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// Boot

function initApp() {
    if (getCurrentUser()) {
        renderDashboard();
    } else {
        renderLogin();
    }
}

// Helpers

function showError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden');
    el.classList.add('visible');
}

function hideError(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('hidden');
    el.classList.remove('visible');
}

function markInvalid(inputId) {
    const el = document.getElementById(inputId);
    if (el) el.classList.add('error-field');
}

function clearInvalid(inputId) {
    const el = document.getElementById(inputId);
    if (el) el.classList.remove('error-field');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// Login

function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="auth-container">
            <div class="glass-card p-8 fade-in">
                <div class="auth-heading">
                    <div class="icon-box" style="margin: 0 auto 1rem;">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6
                                11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622
                                5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152
                                c-3.196 0-6.1-1.249-8.25-3.286z"/>
                        </svg>
                    </div>
                    <h1>Bem-vindo de volta</h1>
                    <p>Acesse sua conta para continuar</p>
                </div>

                <form id="loginForm" novalidate>
                    <div class="form-group">
                        <label class="form-label" for="loginEmail">E-mail</label>
                        <input type="email" id="loginEmail" placeholder="seu@email.com" class="glass-input">
                        <p id="loginEmailError" class="error-msg hidden"></p>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="loginPassword">Senha</label>
                        <input type="password" id="loginPassword" placeholder="••••••••" class="glass-input">
                        <p id="loginPasswordError" class="error-msg hidden"></p>
                    </div>

                    <p id="loginGlobalError" class="global-error hidden"></p>

                    <button type="submit" class="btn-primary" style="width:100%; margin-top: 1.25rem;">
                        Entrar
                    </button>
                </form>

                <div class="auth-footer">
                    Nao tem conta?
                    <button id="goToRegister">Cadastre-se</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('goToRegister').addEventListener('click', renderRegister);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    let valid = true;

    hideError('loginEmailError');
    hideError('loginPasswordError');
    hideError('loginGlobalError');
    clearInvalid('loginEmail');
    clearInvalid('loginPassword');

    if (!email) {
        showError('loginEmailError', 'Informe seu e-mail.');
        markInvalid('loginEmail');
        valid = false;
    }

    if (!password) {
        showError('loginPasswordError', 'Informe sua senha.');
        markInvalid('loginPassword');
        valid = false;
    }

    if (!valid) return;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showError('loginGlobalError', 'E-mail nao cadastrado ou senha incorreta.');
        markInvalid('loginEmail');
        markInvalid('loginPassword');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    renderDashboard();
}

// Register

function renderRegister() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="auth-container">
            <div class="glass-card p-8 fade-in">
                <div class="auth-heading">
                    <div class="icon-box" style="margin: 0 auto 1rem;">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0
                                3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109
                                A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
                        </svg>
                    </div>
                    <h1>Criar conta</h1>
                    <p>Preencha os dados abaixo para comecar</p>
                </div>

                <form id="registerForm" novalidate>
                    <div class="form-group">
                        <label class="form-label" for="registerName">Nome completo</label>
                        <input type="text" id="registerName" placeholder="Seu nome" class="glass-input">
                        <p id="registerNameError" class="error-msg hidden"></p>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="registerEmail">E-mail</label>
                        <input type="email" id="registerEmail" placeholder="seu@email.com" class="glass-input">
                        <p id="registerEmailError" class="error-msg hidden"></p>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="registerPassword">Senha</label>
                        <input type="password" id="registerPassword" placeholder="Minimo 6 caracteres" class="glass-input">
                        <p id="registerPasswordError" class="error-msg hidden"></p>
                    </div>

                    <p id="registerGlobalError" class="global-error hidden"></p>

                    <button type="submit" class="btn-primary" style="width:100%; margin-top: 1.25rem;">
                        Criar conta
                    </button>
                </form>

                <div class="auth-footer">
                    Ja tem conta?
                    <button id="goToLogin">Faca login</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('goToLogin').addEventListener('click', renderLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    let valid = true;

    hideError('registerNameError');
    hideError('registerEmailError');
    hideError('registerPasswordError');
    hideError('registerGlobalError');
    clearInvalid('registerName');
    clearInvalid('registerEmail');
    clearInvalid('registerPassword');

    if (!name) {
        showError('registerNameError', 'Informe seu nome.');
        markInvalid('registerName');
        valid = false;
    }

    if (!email) {
        showError('registerEmailError', 'Informe seu e-mail.');
        markInvalid('registerEmail');
        valid = false;
    }

    if (!password) {
        showError('registerPasswordError', 'Informe uma senha.');
        markInvalid('registerPassword');
        valid = false;
    } else if (password.length < 6) {
        showError('registerPasswordError', 'A senha deve ter no minimo 6 caracteres.');
        markInvalid('registerPassword');
        valid = false;
    }

    if (!valid) return;

    const users = getUsers();
    if (users.some(u => u.email === email)) {
        showError('registerGlobalError', 'Este e-mail ja esta cadastrado.');
        markInvalid('registerEmail');
        return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
    renderDashboard();
}

// Dashboard

function renderDashboard() {
    const user = getCurrentUser();
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="dashboard-container fade-in">
            <header class="dash-header">
                <div class="dash-greeting">
                    <h1>Ola, <span>${escapeHtml(user.name.split(' ')[0])}</span></h1>
                    <p>Organize suas tarefas do dia</p>
                </div>
                <button id="logoutBtn" class="btn-ghost">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25
                            2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15
                            M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                    </svg>
                    Sair
                </button>
            </header>

            <div class="glass-card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
                <p class="section-title">Nova Tarefa</p>
                <form id="todoForm" novalidate>
                    <div class="grid-2">
                        <div class="col-span-2 form-group" style="margin-bottom:0;">
                            <label class="form-label" for="todoTitle">
                                Titulo <span class="required">*</span>
                            </label>
                            <input type="text" id="todoTitle"
                                placeholder="O que precisa ser feito?" class="glass-input">
                            <p id="todoTitleError" class="error-msg hidden"></p>
                        </div>

                        <div class="form-group" style="margin-bottom:0;">
                            <label class="form-label" for="todoType">Tipo</label>
                            <select id="todoType" class="glass-input">
                                <option value="work">Trabalho</option>
                                <option value="personal">Pessoal</option>
                                <option value="study">Estudos</option>
                            </select>
                        </div>

                        <div class="form-group" style="margin-bottom:0;">
                            <label class="form-label" for="todoDesc">
                                Descricao <span class="optional">(opcional)</span>
                            </label>
                            <textarea id="todoDesc" placeholder="Detalhes da tarefa..." rows="1"
                                class="glass-input"></textarea>
                        </div>
                    </div>

                    <div style="display:flex; justify-content:flex-end; margin-top:1.25rem;">
                        <button type="submit" class="btn-primary">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            Adicionar Tarefa
                        </button>
                    </div>
                </form>
            </div>

            <div>
                <p class="section-title">Suas Tarefas</p>
                <div id="todoList"></div>
            </div>
        </div>
    `;

    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('todoForm').addEventListener('submit', handleAddTodo);
    renderTodoList();
}

// Todo CRUD

const TYPE_CONFIG = {
    work:     { label: 'Trabalho', badgeClass: 'badge-work' },
    personal: { label: 'Pessoal',  badgeClass: 'badge-personal' },
    study:    { label: 'Estudos',  badgeClass: 'badge-study' },
};

function handleAddTodo(e) {
    e.preventDefault();

    const title = document.getElementById('todoTitle').value.trim();
    const type = document.getElementById('todoType').value;
    const description = document.getElementById('todoDesc').value.trim();

    hideError('todoTitleError');
    clearInvalid('todoTitle');

    if (!title) {
        showError('todoTitleError', 'O titulo da tarefa e obrigatorio.');
        markInvalid('todoTitle');
        return;
    }

    const user = getCurrentUser();
    const todos = getTodos();

    todos.push({
        id: Date.now(),
        userId: user.email,
        title,
        type,
        description,
        done: false,
    });

    saveTodos(todos);
    document.getElementById('todoForm').reset();
    renderTodoList();
}

function handleCompleteTodo(id) {
    const todos = getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return;
    todos[index].done = true;
    saveTodos(todos);
    renderTodoList();
}

function renderTodoList() {
    const user = getCurrentUser();
    const container = document.getElementById('todoList');
    const allTodos = getTodos();

    const userTodos = allTodos.filter(t => t.userId === user.email);
    const pending   = userTodos.filter(t => !t.done);
    const done      = userTodos.filter(t => t.done);
    const sorted    = [...pending, ...done];

    if (sorted.length === 0) {
        container.innerHTML = `
            <div class="glass-card empty-state">
                <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                        M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <p>Nenhuma tarefa cadastrada ainda.</p>
                <p class="hint">Adicione sua primeira tarefa acima.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = sorted.map(todo => {
        const cfg = TYPE_CONFIG[todo.type] || TYPE_CONFIG.work;
        const doneClass = todo.done ? 'done' : '';

        const actionBtn = !todo.done
            ? `<button onclick="handleCompleteTodo(${todo.id})" class="btn-complete">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>
                    Concluir
               </button>`
            : `<span class="todo-done-label">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style="color:#4ade80; opacity:0.6;">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75
                            -4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0
                            10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25
                            2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/>
                    </svg>
                    Concluida
               </span>`;

        const descHtml = todo.description
            ? `<p class="todo-desc">${escapeHtml(todo.description)}</p>`
            : '';

        return `
            <div class="todo-card ${doneClass}">
                <div class="todo-card-body">
                    <div class="todo-card-header">
                        <span class="todo-title">${escapeHtml(todo.title)}</span>
                        <span class="badge ${cfg.badgeClass}">${cfg.label}</span>
                    </div>
                    ${descHtml}
                </div>
                ${actionBtn}
            </div>
        `;
    }).join('');
}

// Logout

function handleLogout() {
    localStorage.removeItem('currentUser');
    renderLogin();
}

// Init

initApp();
