import {UiBlockTypes} from "../../ui-block/UiBlockTypes";

export default {
    operation: 'shift',
    renderComponent: UiBlockTypes.SMARTLABEL_NUTRITION,
    spec: {
        "@1": "",
        "nutritionSection": {
            "nutrientFactPanels": {
                "0": {
                    "serving": {
                        "servingsPerPack": "jolt_nutritionSection.nutrientPanels[0].servingPerContainer"
                    },
                    "nutrients": {
                        "*": {
                            "headNutrient": {
                                "headNutrientName": {
                                    "Calories from Saturated Fat|Calories From Sat Fat Percent|Calories From Sugar Percent|Calories From Fat Percent|Sodium per Calorie|Carbohydrate Exchange|Calories From Carbohydrates Percent": null,
                                    "*": {
                                        "@(2,headNutrientName)": {
                                            "Calories": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Calories": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Calories From Fat": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Calories From Fat": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Total Fat": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Fat": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Saturated Fat": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Fat": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Trans Fat": {
                                                "#<i>Trans</i> Fat": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Fat": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Polyunsaturated Fat": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Fat": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Monounsaturated Fat": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Fat": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Cholesterol": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Cholesterol": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Sodium": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Sodium": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Total Carbohydrate": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Carbohydrate": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Dietary Fiber": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Fiber": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Sugars": {
                                                "#Total Sugars": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Carbohydrate": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Added Sugars": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Carbohydrate": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Sugar Alcohol": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Carbohydrate": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Protein": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Protein": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Vitamin D": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Vitamin A": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Vitamin B6": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Vitamin B12": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Pantothenic Acid": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Vitamin C": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Vitamin E": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Vitamin K": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Calcium": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Iron": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Potassium": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Zinc": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Selenium": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Manganese": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Copper": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Thiamin": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Riboflavin": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Niacin": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Folate": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Folic Acid": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Vitamin": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Magnesium": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            },
                                            "Phosphorus": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].name",
                                                "#Mineral": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].group"
                                            }
                                        },
                                        "@(3,operator)": "jolt_nutritionSection.nutrientPanels[0].nutrients[&4].symbol",
                                        "@(3,percentDv)": {
                                            "*.0": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].dvpEndsWithZero"
                                            },
                                            "*": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].value"
                                            }
                                        },
                                        "@(3,perServe)": {
                                            "*.0": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].valueEndsWithZero"
                                            },
                                            "*": {
                                                "@1": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].value"
                                            }
                                        },
                                        "@(3,unitOfMeasure)": "jolt_nutritionSection.nutrientPanels[0].nutrients[&4].uom",
                                        "@(2,bold)": "jolt_nutritionSection.nutrientPanels[0].nutrients[&4].bold",
                                        "@(7,nfpLabelType)": {
                                            "NEW_LABEL_2018": {
                                                "@(4,newLabelOrdering)": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].order"
                                            },
                                            "*": {
                                                "@(4,ordering)": "jolt_nutritionSection.nutrientPanels[0].nutrients[&6].order"
                                            }
                                        },
                                        "@(2,indent)": "jolt_nutritionSection.nutrientPanels[0].nutrients[&4].indent",
                                        "@(2,headNutrientId)": "jolt_nutritionSection.nutrientPanels[0].nutrients[&4].feNutrientId"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}
