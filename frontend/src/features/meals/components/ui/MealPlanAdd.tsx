

const MealPlanAdd = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Weekly Overview */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Weekly Overview</h2>
                <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day, i) => (
                            <div key={day} className="text-center">
                                <div className="text-sm text-gray-600 mb-2">
                                    {day}
                                </div>
                                <div className="space-y-1">
                                    <div
                                        className={`h-2 rounded ${
                                            i < 3
                                                ? "bg-green-400"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                    <div
                                        className={`h-2 rounded ${
                                            i < 2
                                                ? "bg-green-400"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                    <div
                                        className={`h-2 rounded ${
                                            i < 4
                                                ? "bg-green-400"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* Shopping List */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Shopping List</h2>
                    <button className="text-blue-600 text-sm hover:underline">
                        Generate List
                    </button>
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span>2 lbs Strip Steak</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span>1 lb Ground Chicken</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span>Fresh Spinach (2 bunches)</span>
                    </label>
                </div>
            </section>

            {/* Nutrition Summary */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">
                    Daily Nutrition Average
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            2,100
                        </div>
                        <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            85g
                        </div>
                        <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            230g
                        </div>
                        <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            75g
                        </div>
                        <div className="text-sm text-gray-600">Fat</div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default MealPlanAdd;