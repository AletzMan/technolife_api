import { pool } from "../../config/db.js"

export const GetProducts = async (req, res) => {
    const [response] = await pool.query('SELECT * FROM products')
    res.json(response)
}

export const GetProduct = async (req, res) => {
    const id = req.params.id
    const [response] = await pool.query(`SELECT * FROM products WHERE product_id='${id}'`)
    if (response.length <= 0) {
        return res.status(404).json({
            code: 4,
            message: "Product not found"
        })
    }
    res.json(response[0])
}

export const PostProduct = async (req, res) => {
    const [response] = await pool.query(sql, values, (error, result) => {
        if (error) throw error
        console.log('Fila insertada con éxito:', result.insertId)
    })
    res.json(req.body)
}

export const DeleteProduct = async (req, res) => {
    const id = req.params.id
    const [response] = await pool.query(`DELETE FROM products WHERE id=${id}`)
    res.json(response)
}



const Items = [
    {
        title: 'Acer 24" 165Hz Full HD Gaming Monitor 1ms Freesync Premium',
        specs: {
            details: [
                {
                    title: "Model",
                    options: [
                        {
                            name: "Brand",
                            description: "Acer",
                        },
                        {
                            name: "Series",
                            description: "NITRO QG1",
                        },
                        {
                            name: "Model",
                            description: "QG241Y Pbmiipx",
                        },
                        {
                            name: "Part Number",
                            description: "UM.QQ1AA.P01",
                        },
                        {
                            name: "Cabinet Color",
                            description: "Black",
                        },
                        {
                            name: "Bezel Design",
                            description: "3 Sided Frameless",
                        },
                    ]
                },
                {
                    title: "Display",
                    options: [
                        {
                            name: "Screen Size",
                            description: `24" (23.8" Viewable)`,
                        },
                        {
                            name: "Widescreen",
                            description: "Yes",
                        },
                        {
                            name: "Glare Screen",
                            description: "Anti-glare",
                        },
                        {
                            name: "LED Backlight",
                            description: "Yes",
                        },
                        {
                            name: "Panel",
                            description: "VA",
                        },
                        {
                            name: "Display Type",
                            description: "FHD",
                        },
                        {
                            name: "Adaptive Sync Technology",
                            description: "FreeSync Premium (AMD Adaptive Sync)",
                        },
                        {
                            name: "Maximum Resolution",
                            description: "1920 x 1080",
                        },
                        {
                            name: "Recommended Resolution",
                            description: "1920 x 1080",
                        },
                        {
                            name: "Viewing Angle",
                            description: "178° (H) / 178° (V)",
                        },
                        {
                            name: "Aspect Ratio",
                            description: "16:9",
                        },
                        {
                            name: "Brightness",
                            description: "250 cd/m2",
                        },
                        {
                            name: "Contrast Ratio",
                            description: "ACM 100,000,000:1 (4000:1)",
                        },
                        {
                            name: "Response Time",
                            description: "1ms (VRB)",
                        },
                        {
                            name: "Display Colors",
                            description: "16.7 Million",
                        },
                        {
                            name: "Pixel Pitch",
                            description: "0.2745mm",
                        },
                        {
                            name: "Refresh Rate",
                            description: "165 Hz (Max.)",
                        },
                        {
                            name: "HDR Standard",
                            description: "HDR10",
                        },
                        {
                            name: "Curved Surface Screen",
                            description: "Flat Panel",
                        },
                        {
                            name: "Horizontal Refresh Rate",
                            description: [
                                "HDMI 1.4: 30 - 160 KHz",
                                "HDMI 2.0: 30 - 193 KH",
                                "DP: 30 - 193 KHz",
                            ],
                        },
                        {
                            name: "Vertical Refresh Rate",
                            description: [
                                "HDMI 1.4: 48 - 144 Hz",
                                "HDMI 2.0: 48 - 165 Hz",
                                "DP: 48 - 165 Hz",
                            ],
                        },
                    ]
                },
                {
                    title: "Connectivity",
                    options: [
                        {
                            name: "Input Video Compatibility",
                            description: "Digital",
                        },
                        {
                            name: "Connectors",
                            description: "2 x HDMI, DisplayPort, Audio Out",
                        },
                        {
                            name: "HDMI",
                            description: "1 x HDMI 2.0, 1 x HDMI 1.4",
                        },
                        {
                            name: "DisplayPort",
                            description: "1 x DisplayPort 1.2",
                        },
                        {
                            name: "Video Ports",
                            description: "1 x DisplayPort 1.2 / 1 x HDMI 1.4 / 1 x HDMI 2.0",
                        },
                    ]
                },
                {
                    title: "Power",
                    options: [
                        {
                            name: "Power Supply",
                            description: "100 - 240 VAC, 50/60Hz",
                        },
                        {
                            name: "Power Consumption",
                            description: [
                                "Power Max: 30W",
                                "Power On: 20W",
                            ],
                        },
                    ]
                },
                {
                    title: "Convenience",
                    options: [
                        {
                            name: "Stand Adjustments",
                            description: "Tilt: -5° to 20°",
                        },
                        {
                            name: "Built-in Speakers",
                            description: "2 x 2W",
                        },
                        {
                            name: "VESA Compatibility - Mountable",
                            description: "100 x 100mm",
                        },
                    ]
                },
                {
                    title: "Dimensions & Weight",
                    options: [
                        {
                            name: "Dimensions (H x W x D)",
                            description: `16.30" x 21.30" x 8.70" w/ stand`,
                        },
                        {
                            name: "Weight",
                            description: "6 lbs. w/ o stand",
                        },
                    ]
                },
                {
                    title: "Packaging",
                    options: [
                        {
                            name: "Brand",
                            description: [
                                "1 x Nitro QG241YP Widescreen LCD Monitor",
                                "1 x HDMI Cable",
                                "1 x Power Cord(US)"
                            ],
                        },
                    ]
                },
                {
                    title: "Additional Information",
                    options: [
                        {
                            name: "Date First Available",
                            description: "March 04, 2021",
                        },
                    ]
                },
            ],
        },
        product_id: "9SA3X",
        image: "24-011-374-V01.jpg",
        slideImages: [
            "24-011-382-V08.jpg",
            "24-011-382-V80.jpg",
            "24-011-382-V02.jpg",
            "24-011-382-V06.jpg",
            "24-011-382-V04.jpg",
            "24-011-382-V05.jpg",
            "24-011-382-V07.jpg",
            "24-011-382-V03.jpg",
        ],
        brand: "ACER",
        brandLogo: "Brand1146.gif",
        category_id: 6,
        subcategory_id: 29,
        rating: 5,
        sameDayDelivery: false,
        storePickUp: true,
        price: 149.99,
        isDiscounted: true,
        discount: 20,
        isNew: true,
        isSale: false,
        isFreeShipping: true,
        isClearance: false,
    }
]

const specsJSON = JSON.stringify(Items[0].specs)
const sql = 'INSERT INTO products (title, specs, product_id, image, slideImages, brand, brandLogo, category_id, subcategory_id, rating, sameDayDelivery, storePickUp, price, isDiscounted, discount, isNew, isSale, isFreeShipping, isClearance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
const values = [
    Items[0].title,
    specsJSON,
    Items[0].product_id,
    Items[0].image,
    JSON.stringify(Items[0].slideImages),
    Items[0].brand,
    Items[0].brandLogo,
    Items[0].category_id,
    Items[0].subcategory_id,
    Items[0].rating,
    Items[0].sameDayDelivery,
    Items[0].storePickUp,
    Items[0].price,
    Items[0].isDiscounted,
    Items[0].discount,
    Items[0].isNew,
    Items[0].isSale,
    Items[0].isFreeShipping,
    Items[0].isClearance,
]