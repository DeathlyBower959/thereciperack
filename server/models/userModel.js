import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const defaultThemes = [
    {
        themeID: 'default_themes.dark',
        name: 'Default - Dark',
        navbar: {
            background: '#2d2d2d',
            link: '#a0a0a0',
        },
        alert: {
            color: '#ffafb5',
            background: '#5f3235',
            border: '#764548',
        },
        foreground: '#fff',
        secondaryForeground: '#d4d4d4',
        accent: '#a74ef6',
        secondaryAccent: '#6e00cf',
        background: '#282828',
        secondaryBackground: '#323232',
        thirdBackground: '#3c3c3c',
        textboxBackground: '#444444',
        muted: '#a0a0a0',
        faded: '#949494',
        error: '#ff5252',
    },
    {
        themeID: 'default_themes.light',
        name: 'Default - Light',
        navbar: {
            background: '#d8d8d8',
            link: '#545454',
        },
        alert: {
            color: '#842029',
            background: '#f8d7da',
            border: '#f5c2c7',
        },
        foreground: '#3f3f3f',
        secondaryForeground: '#707070',
        accent: '#d5a4ff',
        secondaryAccent: '#a43bff',
        background: '#fafafa',
        secondaryBackground: '#e6e6e6',
        thirdBackground: '#d2d2d2',
        textboxBackground: '#bebebe',
        muted: '#545454',
        faded: '#595959',
        error: '#ff3333',
    },
]

const userSchema = mongoose.Schema({
    id: { type: String, required: true, default: uuidv4() },
    token: { type: String },

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    settings: {
        type: {
            themes: {
                type: [
                    {
                        themeID: {
                            type: String,
                            required: true,
                        },
                        name: {
                            type: String,
                            required: true,
                            default: 'No Name',
                        },

                        navbar: {
                            type: {
                                background: {
                                    type: String,
                                    required: true,
                                    default: defaultThemes[0].navbar.background,
                                },
                            },
                            required: true,
                            default: {
                                background: defaultThemes[0].navbar.background,
                            },
                        },

                        foreground: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].foreground,
                        },
                        secondaryForeground: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].secondaryForeground,
                        },

                        accent: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].accent,
                        },
                        secondaryAccent: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].secondaryAccent,
                        },

                        background: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].background,
                        },
                        secondaryBackground: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].secondaryBackground,
                        },
                        textboxBackground: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].textboxBackground,
                        },

                        muted: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].muted,
                        },
                        faded: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].faded,
                        },
                        error: {
                            type: String,
                            required: true,
                            default: defaultThemes[0].error,
                        },
                    },
                ],
            },
            selectedTheme: {
                type: String,
                required: true,
                default: 'default_themes.dark',
            },
            seePublicRecipes: { type: Boolean, required: true, default: true },
            sharePublicRecipes: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        required: true,
        default: {
            themes: defaultThemes,
            selectedTheme: 'default_themes.dark',
        },
    },

    cookbooks: {
        type: [
            {
                id: { type: String, required: true, default: uuidv4() },
                name: {
                    type: String,
                    required: true,
                    default: 'New Recipe',
                },
                coverImage: String,
                recipes: {
                    type: [
                        {
                            id: {
                                type: String,
                                required: true,
                                default: uuidv4(),
                            },
                            name: {
                                type: String,
                                required: true,
                            },
                            description: {
                                type: String,
                                required: true,
                            },
                            image: String,
                            tags: [String],
                            ingredients: {
                                type: [
                                    {
                                        id: {
                                            type: String,
                                            required: true,
                                            default: uuidv4(),
                                        },
                                        name: {
                                            type: String,
                                            required: true,
                                        },
                                        amount: {
                                            type: String,
                                            required: true,
                                        },
                                        unit: {
                                            type: String,
                                            required: true,
                                        },
                                    },
                                ],
                                required: true,
                            },
                            steps: {
                                id: {
                                    type: String,
                                    required: true,
                                    default: uuidv4(),
                                },
                                type: [
                                    {
                                        description: {
                                            type: String,
                                            required: true,
                                        },
                                    },
                                ],
                                required: true,
                            },
                            servSize: {
                                type: String,
                                required: true,
                            },
                            prep: {
                                type: Object,
                                required: true,
                            },
                            cook: {
                                type: Object,
                                required: true,
                            },
                        },
                    ],
                },
            },
        ],
        default: [],
    },

    shoppingList: {
        type: [
            {
                id: { type: String, required: true, default: uuidv4() },
                amount: { type: String, required: true },
                unit: { type: String, required: true },
                name: { type: String, required: true },
            },
        ],
        default: [],
    },
})

const User = mongoose.model('User', userSchema)

export default User
