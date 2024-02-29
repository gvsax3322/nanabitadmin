import React, { useState } from 'react';

interface Category {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
}

const categories: Category[] = [
    {
        id: 1,
        name: '대분류1',
        subcategories: [
            { id: 1, name: '중분류1-1' },
            { id: 2, name: '중분류1-2' }
        ]
    },
    {
        id: 2,
        name: '대분류2',
        subcategories: [
            { id: 3, name: '중분류2-1' },
            { id: 4, name: '중분류2-2' }
        ]
    }
];

const CateFilter: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div>
            <select onChange={(e) => handleCategoryChange(parseInt(e.target.value))}>
                <option value="">대분류 선택</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <select>
                <option value="">중분류 선택</option>
                {selectedCategory &&
                    categories.find(category => category.id === selectedCategory)?.subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    ))
                }
            </select>
        </div>
    );
};

export default CateFilter;
