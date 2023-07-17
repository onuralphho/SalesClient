interface IMenuItems {
	title: string;
	url: string;
}

export const MenuItems = <IMenuItems[]>[
	{ title: "Products", url: "/products" },
	{ title: "Add New", url: "products/add" },
	{ title: "Orders", url: "/orders" },
];
