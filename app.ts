class SharePointLoader {
    url: string;
    clientContext: SP.ClientContext;
	constructor(url: string) {
		this.url = url;
		this.clientContext = new SP.ClientContext(this.url)
	}

	loadList(name: string, onSuccess: (loaded: any) => void, onFail = (args: any) => {}) {
		let targetList = this.clientContext.get_web().get_lists().getByTitle(name);
		var query = SP.CamlQuery.createAllItemsQuery();
		let items = targetList.getItems(query);
		this.clientContext.load(items);

		this.clientContext.executeQueryAsync(
			Function.createDelegate(this, onSuccess.bind(this, items)) as any, 
			(sender: any, args: any) => onFail(args)
        );
	}

	insertItem(listName: string, item: Object, onSuccess = () => {}, onFail = () => {}) {
		let targetList = this.clientContext.get_web().get_lists().getByTitle(listName);
		var itemCreateInfo = new SP.ListItemCreationInformation();
		let newItem = targetList.addItem(itemCreateInfo);
		for (let [key, value] of Object.entries(item))
			newItem.set_item(key, value);
		newItem.update();
	
		this.clientContext.load(newItem);
		this.clientContext.executeQueryAsync(
			onSuccess, onFail
		);
	}

	updateItem(listName: string, itemId: number, properties: Object, onSuccess = () => {}, onFail = () => {}) {
		let targetList = this.clientContext.get_web().get_lists().getByTitle(listName);
		let oListItem = targetList.getItemById(itemId);
		for (let [key, value] of Object.entries(properties))
			oListItem.set_item(key, value);
		oListItem.update();
	
		this.clientContext.executeQueryAsync(
			onSuccess, onFail
		);
	}
}

interface ImageRecord {
    brand: string;
    model: string;
    url: string
}

interface PartRecord {
    brand: string;
    model: string;
    name: string;
    amount: number;
    price: string;
}

function SPImageToModel(item: any): ImageRecord {
    return { brand: item.get_item("Brand"), model: item.get_item("Model"), url: 
    (item.get_item("Image") as SP.FieldUrlValue).get_url() }
}

function SPPartToModel(item: any): PartRecord {
    return { brand: item.get_item("Brand"), model: item.get_item("Model"), name: item.get_item("Name"),
    amount: item.get_item("Amount"), price: item.get_item("UnitPrice") + " zł" }
}

$(document).ready(function() {	
    let images: ImageRecord[] = [];
    let parts: PartRecord[] = [];

    ExecuteOrDelayUntilScriptLoaded(() => {
        let sp = new SharePointLoader("https://harddomain.sharepoint.com/sites/Wall");
        sp.loadList(
            "Cars",
            list => {
                var listEnumerator = list.getEnumerator();
                while (listEnumerator.moveNext()) {
                    let m = listEnumerator.get_current();
                    images.push(SPImageToModel(m));
                }
                if (images.length && parts.length)
                    buildKendoUI(images, parts);
            },
            args => {
                alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            }
        );
        sp.loadList(
            "CarParts",
            list => {
                var listEnumerator = list.getEnumerator();
                while (listEnumerator.moveNext()) {
                    let m = listEnumerator.get_current();
                    parts.push(SPPartToModel(m));
                }
                if (images.length && parts.length)
                    buildKendoUI(images, parts);
            },
            args => {``
                alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            }
        );
    }, "sp.js");
});

function buildKendoUI(images: ImageRecord[], parts: PartRecord[]) {
    let brands = Array.from(new Set(images.map(i => i.brand)).values()).map(a => { 
        return { text: a, value: a };
    });
    let chosenBrand = brands[0].text;
    let chosenModel: string | undefined;

    // create DropDownList from input HTML element
    $("#brand").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: brands,
        index: 0,
        optionLabel: "select brand",
        change: function(e) {
            chosenBrand = this.dataItem().text;
            let data = new kendo.data.DataSource({
                data: Array.from(new Set(images.filter(i => i.brand == chosenBrand).map(i => i.model)).values()).map(a => { 
                    return { text: a, value: a };
                })
            });
            $("#model").data("kendoDropDownList").setDataSource(data);
        }
    });

    $("#model").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: Array.from(new Set(images.filter(i => i.brand == chosenBrand).map(i => i.model)).values()).map(a => { 
                return { text: a, value: a };
            })
        },
        index: 0,
        optionLabel: "select model",
        change: function(e) {
            chosenModel = this.dataItem().text;
            
            let url = images.filter(i => i.brand == chosenBrand && i.model == chosenModel)[0]?.url; 
            $("#photo").attr("src", url);

            let amountOfParts = parts.filter(i => i.brand == chosenBrand && i.model == chosenModel)
            .map(p => p.amount).reduce((t, n) => t + n, 0);
            $("#numberOfParts").html("Total parts: " + amountOfParts);

            let data = new kendo.data.DataSource({
                data: parts.filter(i => i.brand == chosenBrand && i.model == chosenModel).map(p => { 
                    return { "Name": p.name, "Amount": p.amount, "UnitPrice": p.price };
                })
            })
            $("#grid").data("kendoGrid").setDataSource(data);
        }
    });

    $("#grid").kendoGrid({
        dataSource: { data: [] },
        sortable: true,
        columns: [{ field: "Name", title: "Name" }, 
        { field: "Amount", title: "Amount" }, 
        { field: "UnitPrice", title: "Unit price" }]
    });
}