export const weapons = [
    { id: 'rock', name: 'Rock', icon: '✊', color: 'from-gray-500 to-gray-700' },
    { id: 'paper', name: 'Paper', icon: '✋', color: 'from-blue-200 to-white text-gray-800' },
    { id: 'scissors', name: 'Scissors', icon: '✌️', color: 'from-yellow-400 to-orange-500' },
    { id: 'heart', name: 'I Love You', icon: '💘', color: 'from-pink-500 to-rose-600', special: true },
]

export const elements = [
    { id: 'earth', name: 'Earth', icon: '🪨', color: 'from-amber-700 to-orange-900', desc: 'ดิน ชนะ น้ำ' },
    { id: 'water', name: 'Water', icon: '💧', color: 'from-cyan-400 to-blue-600', desc: 'น้ำ ชนะ ไฟ' },
    { id: 'wind', name: 'Wind', icon: '🌪️', color: 'from-teal-300 to-emerald-500', desc: 'ลม ชนะ ดิน' },
    { id: 'fire', name: 'Fire', icon: '🔥', color: 'from-red-500 to-orange-500', desc: 'ไฟ ชนะ ลม' },
]

export function getWeaponIcon(id) {
    return weapons.find(w => w.id === id)?.icon || '❓'
}

export function getElementIcon(id) {
    return elements.find(e => e.id === id)?.icon || '❓'
}

export function getElementColor(id) {
    if (id === 'earth') return 'bg-amber-700'
    if (id === 'water') return 'bg-cyan-500'
    if (id === 'wind') return 'bg-teal-400'
    if (id === 'fire') return 'bg-red-500'
    return 'bg-gray-500'
}
