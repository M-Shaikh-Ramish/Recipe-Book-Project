// --- Custom Cursor Logic ---
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

if (cursor && cursorFollower && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    const addHoverToInputs = () => {
        const interactables = document.querySelectorAll('button, a, input, textarea, select, .recipe-card, .close-btn, .nav-brand');
        interactables.forEach(el => {
            el.removeEventListener('mouseenter', cursorHoverEnter);
            el.removeEventListener('mouseleave', cursorHoverLeave);
            el.addEventListener('mouseenter', cursorHoverEnter);
            el.addEventListener('mouseleave', cursorHoverLeave);
        });
    };

    function cursorHoverEnter() { document.body.classList.add('cursor-hover'); }
    function cursorHoverLeave() { document.body.classList.remove('cursor-hover'); }
} else {
    // If mobile, mock function to prevent errors
    window.addHoverToInputs = () => { };
}

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksMenu = document.getElementById('nav-links-menu');

mobileMenuBtn.addEventListener('click', () => {
    navLinksMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinksMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
        document.body.style.overflow = "auto";
    }
});

const closeMobileMenu = () => {
    navLinksMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
    document.body.style.overflow = "auto";
}

// Add Magic Recipe mobile button
document.getElementById('mobileAddRecipeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    closeMobileMenu();
    document.body.style.overflow = "hidden";
    formModal.classList.add('show');
    resetModalAnimations(formModal);
    document.getElementById('formTitle').textContent = 'Add a Magic Recipe';
    document.getElementById('recipeForm').reset();
    document.getElementById('recipeId').value = '';
});

// --- MASSIVE DATA GENERATION (~100 Recipes: 25 per category) ---
const categories = ['Breakfast', 'Main Course', 'Dessert', 'Appetizer'];

const adjectives = ["Crispy", "Spicy", "Golden", "Creamy", "Smoky", "Sweet", "Savory", "Bold", "Zesty", "Tangy", "Rich", "Velvety", "Crunchy", "Fire-Roasted", "Glazed", "Sizzling", "Juicy", "Ultimate", "Classic", "Premium", "Heavenly", "Gourmet", "Signature", "Melted", "Fluffy"];
const bases = {
    'Breakfast': ["Pancakes", "Waffles", "Omelet", "Avocado Toast", "French Toast", "Bagel", "Breakfast Burrito", "Smoothie Bowl", "Eggs Benedict", "Oatmeal", "Hash Browns", "Croissant", "Muffins", "Frittata", "Crepes", "Granola", "Shakshuka", "Fried Eggs", "Breakfast Sandwich", "Sausage Links", "Bacon Platter", "Morning Wrap", "Acai Bowl", "Porridge", "Cinnamon Rolls"],
    'Main Course': ["Steak", "Pasta", "Burger", "Pizza", "Tacos", "Curry", "Risotto", "Fried Rice", "Grilled Chicken", "Salmon Filet", "Bolognese", "Ramen", "Lasagna", "Enchiladas", "Pad Thai", "Roast Beef", "Paella", "Mac and Cheese", "BBQ Ribs", "Sushi Platter", "Fish and Chips", "Fajitas", "Biryani", "Meatballs", "Lamb Chops"],
    'Dessert': ["Chocolate Cake", "Cheesecake", "Brownies", "Ice Cream Sundae", "Apple Pie", "Macarons", "Tiramisu", "Cupcakes", "Donuts", "Lava Cake", "Crème Brûlée", "Pudding", "Tart", "Cookies", "Mille-Feuille", "Churros", "Panna Cotta", "Mousse", "Profiteroles", "Trifle", "Eclairs", "Fruit Salad", "Gelato", "Fudge", "Sorbet"],
    'Appetizer': ["Bruschetta", "Spring Rolls", "Nachos", "Chicken Wings", "Mozzarella Sticks", "Calamari", "Deviled Eggs", "Garlic Bread", "Stuffed Mushrooms", "Sliders", "Spinach Dip", "Onion Rings", "Meat Pies", "Quesadilla", "Samosas", "Jalapeno Poppers", "Guacamole", "Ceviche", "Dumplings", "Brie Bites", "Hummus", "Croquettes", "Satay Skewers", "Cheese Board", "Caviar Blinis"]
};

// Some random ingredients lists based on category
const ingredientPools = {
    'Breakfast': ['Eggs', 'Milk', 'Butter', 'Flour', 'Sugar', 'Bacon', 'Avocado', 'Bread', 'Syrup', 'Berries', 'Cheese', 'Oats', 'Coffee', 'Yogurt'],
    'Main Course': ['Chicken', 'Beef', 'Pork', 'Fish', 'Pasta', 'Rice', 'Tomato Sauce', 'Garlic', 'Onions', 'Olive Oil', 'Spices', 'Cheese', 'Potatoes', 'Vegetables'],
    'Dessert': ['Chocolate', 'Flour', 'Sugar', 'Eggs', 'Butter', 'Vanilla', 'Cream', 'Fruit', 'Nuts', 'Caramel', 'Powdered Sugar', 'Cocoa', 'Gelatin'],
    'Appetizer': ['Cheese', 'Bread', 'Garlic', 'Chicken', 'Veggies', 'Dip', 'Chips', 'Seafood', 'Spices', 'Herbs', 'Olive Oil', 'Lemon', 'Bacon']
};

const generateMassiveData = () => {
    let generated = [];
    let idCounter = 1;

    categories.forEach(cat => {
        const baseNames = bases[cat];
        // Generate 25 per category
        for (let i = 0; i < 25; i++) {
            // Pick a random adjective
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const base = baseNames[i % baseNames.length];
            const title = `${adj} ${base}`;

            const imageKeyword = cat === 'Main Course' ? 'dinner' : cat.toLowerCase();
            const imageUrl = `https://loremflickr.com/800/600/${imageKeyword},food?lock=${idCounter}`;

            const pool = ingredientPools[cat];
            let ingCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 ingredients
            let recipeIngs = [];
            for (let j = 0; j < ingCount; j++) {
                recipeIngs.push(pool[Math.floor(Math.random() * pool.length)]);
            }
            recipeIngs = [...new Set(recipeIngs)];

            const instructions = `1. Prepare all the fresh ingredients carefully.\n2. Heat up the cooking station to the optimal temperature.\n3. Combine the ${recipeIngs[0]} and ${recipeIngs[1] || 'spices'} and cook thoroughly.\n4. Add the remaining ingredients and let the flavors mix perfectly.\n5. Serve hot and enjoy this spectacular ${cat.toLowerCase()}!`;

            generated.push({
                id: idCounter.toString(),
                title: title,
                category: cat,
                imageUrl: imageUrl,
                ingredients: recipeIngs.map(i => i + (Math.random() > 0.5 ? ' - 2 cups' : ' - 1 piece')),
                instructions: instructions
            });
            idCounter++;
        }
    });

    return generated.sort(() => Math.random() - 0.5);
};

// --- Application State ---
let recipes = [];

const loadRecipes = () => {
    const stored = localStorage.getItem('vibrant_recipes_v1');
    if (stored) {
        recipes = JSON.parse(stored);
    } else {
        recipes = generateMassiveData();
        saveRecipes();
    }
};

const saveRecipes = () => {
    localStorage.setItem('vibrant_recipes_v1', JSON.stringify(recipes));
    updateStats();
};

const updateStats = () => {
    const totalEl = document.getElementById('totalRecipesCount');
    if (totalEl) {
        // Animate count
        let current = parseInt(totalEl.textContent) || 0;
        const target = recipes.length;
        const inc = Math.max((target - current) / 20, 1);
        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                totalEl.textContent = target + "+";
                clearInterval(timer);
            } else {
                totalEl.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Update Category Button Counts dynamically
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        const type = btn.getAttribute('data-filter');
        if (type !== 'All') {
            const count = recipes.filter(r => r.category === type).length;
            btn.textContent = `${type} (${count})`;
        } else {
            btn.textContent = `All Recipes (${recipes.length})`;
        }
    });
};

// --- View Router ---
const views = document.querySelectorAll('.page-view');
const navLinks = document.querySelectorAll('.nav-link');

const switchView = (targetId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    views.forEach(view => view.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');

    navLinks.forEach(link => {
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (targetId === 'home-view') {
        renderHomeGrid();
    } else if (targetId === 'explore-view') {
        renderExploreGrid('All');
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="All"]').classList.add('active');
    }
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('data-target')) {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
            switchView(target);
        }
    });
});

// --- Render Logic ---
const createCardHTML = (recipe) => {
    return `
        <div class="card-img-wrapper">
            <span class="card-category">${recipe.category}</span>
            <img src="${recipe.imageUrl}" alt="${recipe.title}" class="card-img" loading="lazy">
        </div>
        <div class="card-content">
            <h3 class="card-title">${recipe.title}</h3>
            <p class="card-ingredients"><strong>Made with:</strong> ${recipe.ingredients.slice(0, 3).join(', ').replace(/ - \d \w+/g, '')}...</p>
            <div class="action-buttons">
                <button class="btn btn-sm edit-icon-btn" onclick="openEditForm(event, '${recipe.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn btn-sm del-icon-btn" onclick="deleteRecipe(event, '${recipe.id}')"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
        </div>
    `;
};

const renderHomeGrid = () => {
    const grid = document.getElementById('homeRecipeGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Show 9 random trending recipes
    const featured = [...recipes].sort(() => Math.random() - 0.5).slice(0, 9);

    featured.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '10');
        card.setAttribute('data-tilt-speed', '400');
        card.setAttribute('data-tilt-glare', 'true');
        card.setAttribute('data-tilt-max-glare', '0.5');

        card.onclick = (e) => {
            if (!e.target.closest('button')) openViewModal(recipe.id);
        };
        card.innerHTML = createCardHTML(recipe);
        grid.appendChild(card);
    });

    if (typeof VanillaTilt !== "undefined" && window.innerWidth > 768) {
        VanillaTilt.init(document.querySelectorAll("#homeRecipeGrid .recipe-card"));
    }
    if (typeof window.addHoverToInputs === 'function') window.addHoverToInputs();
};

const renderExploreGrid = (filter = 'All') => {
    const grid = document.getElementById('exploreRecipeGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let filtered = recipes;
    if (filter !== 'All') {
        filtered = recipes.filter(r => r.category === filter);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<h2 style="grid-column: 1/-1; text-align: center; font-size: 2rem;">No recipes found!</h2>`;
        return;
    }

    filtered.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        // Only trigger animations for Desktop so Mobile scrolling keeps smooth
        if (window.innerWidth > 768) {
            card.style.animation = `bounceFadeIn 0.5s ease forwards ${(index % 10) * 0.05}s`;
            card.style.opacity = '0';
        } else {
            card.style.opacity = '1';
        }

        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '8');

        card.onclick = (e) => {
            if (!e.target.closest('button')) openViewModal(recipe.id);
        };
        card.innerHTML = createCardHTML(recipe);
        grid.appendChild(card);
    });

    if (typeof VanillaTilt !== "undefined" && window.innerWidth > 768) {
        VanillaTilt.init(document.querySelectorAll("#exploreRecipeGrid .recipe-card"));
    }
    if (typeof window.addHoverToInputs === 'function') window.addHoverToInputs();
};

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderExploreGrid(e.target.getAttribute('data-filter'));
    });
});

// --- Modal System ---
const formModal = document.getElementById('formModal');
const viewModal = document.getElementById('viewModal');
let currentViewId = null;

const closeAllModals = () => {
    document.body.style.overflow = "auto";
    formModal.classList.remove('show');
    viewModal.classList.remove('show');
};

const resetModalAnimations = (modal) => {
    if (window.innerWidth <= 768) return; // Skip heavy repaints on mobile
    const animations = modal.querySelectorAll('.slide-up');
    animations.forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
    });
};

const openViewModal = (id) => {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    currentViewId = id;
    document.body.style.overflow = "hidden";

    document.getElementById('viewImage').src = recipe.imageUrl;
    document.getElementById('viewCategoryBadge').textContent = recipe.category;
    document.getElementById('viewTitle').textContent = recipe.title;

    const viewIngredients = document.getElementById('viewIngredients');
    viewIngredients.innerHTML = '';
    recipe.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing.trim();
        viewIngredients.appendChild(li);
    });

    document.getElementById('viewInstructions').textContent = recipe.instructions;

    resetModalAnimations(viewModal);
    viewModal.classList.add('show');
};

window.openEditForm = (e, id) => {
    if (e) e.stopPropagation();
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        document.body.style.overflow = "hidden";
        formModal.classList.add('show');
        resetModalAnimations(formModal);

        document.getElementById('formTitle').textContent = 'Flash Update Recipe';
        document.getElementById('recipeId').value = recipe.id;
        document.getElementById('title').value = recipe.title;
        document.getElementById('category').value = recipe.category;
        document.getElementById('imageUrl').value = recipe.imageUrl;
        document.getElementById('ingredients').value = recipe.ingredients.join(', ');
        document.getElementById('instructions').value = recipe.instructions;
    }
};

window.deleteRecipe = (e, id) => {
    if (e) e.stopPropagation();
    if (confirm('WOAH! Are you completely sure you want to delete this amazing recipe?')) {
        recipes = recipes.filter(r => r.id !== id);
        saveRecipes();
        const activeViewId = document.querySelector('.page-view.active').id;
        if (activeViewId === 'home-view') renderHomeGrid();
        if (activeViewId === 'explore-view') renderExploreGrid(document.querySelector('.filter-btn.active').getAttribute('data-filter'));

        if (viewModal.classList.contains('show') && currentViewId === id) {
            closeAllModals();
        }
    }
};

// Form Events
document.getElementById('addRecipeBtn').addEventListener('click', () => {
    document.body.style.overflow = "hidden";
    formModal.classList.add('show');
    resetModalAnimations(formModal);

    document.getElementById('formTitle').textContent = 'Add a Magic Recipe';
    document.getElementById('recipeForm').reset();
    document.getElementById('recipeId').value = '';
});

document.getElementById('closeForm').addEventListener('click', closeAllModals);
document.getElementById('closeView').addEventListener('click', closeAllModals);

window.addEventListener('click', (e) => {
    if (e.target === formModal) closeAllModals();
    if (e.target === viewModal) closeAllModals();
});

document.getElementById('recipeForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const newRecipe = {
        id: document.getElementById('recipeId').value || Date.now().toString(),
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        imageUrl: document.getElementById('imageUrl').value,
        ingredients: document.getElementById('ingredients').value.split(',').map(i => i.trim()).filter(i => i),
        instructions: document.getElementById('instructions').value
    };

    if (document.getElementById('recipeId').value) {
        const index = recipes.findIndex(r => r.id === document.getElementById('recipeId').value);
        if (index !== -1) recipes[index] = newRecipe;
    } else {
        recipes.unshift(newRecipe);
    }

    saveRecipes();
    closeAllModals();
    updateStats();

    const activeViewId = document.querySelector('.page-view.active').id;
    if (activeViewId === 'explore-view') {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        renderExploreGrid(activeFilter);
    } else {
        switchView('explore-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (currentViewId === newRecipe.id && viewModal.classList.contains('show')) {
        openViewModal(newRecipe.id);
    }
});

document.getElementById('editFromViewBtn').addEventListener('click', (e) => {
    if (currentViewId) {
        window.openEditForm(e, currentViewId);
        viewModal.classList.remove('show');
    }
});

document.getElementById('deleteFromViewBtn').addEventListener('click', (e) => {
    if (currentViewId) {
        window.deleteRecipe(e, currentViewId);
    }
});

// Init Execution
loadRecipes();
renderHomeGrid();
