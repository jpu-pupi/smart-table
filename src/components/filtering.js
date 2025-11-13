export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(
                    (name) => {
                        const el = document.createElement("option");
                        el.textContent = name;
                        el.value = name;
                        return el;
                    }
            )
            );
        });
    };

    const applyFiltering = (query, state, action = null) => {
        // Обработка очистки поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const input = parent.querySelector('select, input');
            const field = action.dataset.field;

            if (input) input.value = '';
            if (field && field in state) {
                delete state[field];
            }
            
            // После очистки сразу возвращаем обновленный query
            const filter = {};
            Object.keys(elements).forEach(key => {
                if (elements[key] && ['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            });
            
            return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
        }

        // Обычная фильтрация
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key] && ['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                filter[`filter[${elements[key].name}]`] = elements[key].value;
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
};
