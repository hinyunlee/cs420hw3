var testData = {
	table: new UnicodeDataStructure,
	root: new Node(null),
	lookupTable: new LookupTable(new Entry(3, "A", "Aa"))
}

QUnit.test( "Insert a new entry", function( assert ) {
	testData.table.insert("NAME", 1000000, "New", "Nw")
	assert.strictEqual(testData.table.name(1000000), "NAME", 'Name(1000000) == "New"');
});

QUnit.test( "Mutiple Insert", function( assert ) {
	testData.table.insert("NAME1", 10000000, "A", "Aa")
	testData.table.insert("NAME2", 11000000, "B", "Bb")
	testData.table.insert("NAME3", 12000000, "C", "Cc")
	assert.strictEqual(testData.table.name(10000000), "NAME1", 'Codepoint for 10000000 should be "NAME1"');
	assert.strictEqual(testData.table.name(11000000), "NAME2", 'Codepoint for 11000000 should be "NAME2"');
	assert.strictEqual(testData.table.name(12000000), "NAME3", 'Codepoint for 12000000 should be "NAME3"');
});

QUnit.test( "Node insert", function( assert ) {
	testData.root.insert("TEST NAME ASDF", new Entry(1, "A", "Aa"))
	assert.ok(testData.root.children["TEST"] != null)
	assert.ok(testData.root.children["TEST"].children["NAME"] != null)
	assert.ok(testData.root.children["TEST"].children["NAME"].children["ASDF"] != null)
});

QUnit.test( "Node add and get entry", function( assert ) {
	testData.root.addEntry(new Entry(2, "B", "Bb"))
	assert.ok(testData.root.getEntry(2) !== null)
});

QUnit.test( "Node get child name", function( assert ) {
	var root = new Node(null)
	root.insert("TEST NAME ASDF", new Entry(1, "A", "Aa"))
	var found = root.children["TEST"]
	console.log(found.codepoint)
	assert.strictEqual(root.getChildName(found), "TEST")
});

QUnit.test( "Node split prefix", function( assert ) {
	var tokens = testData.root.splitPrefix("TEST NAME ASDF")
	assert.strictEqual(tokens.first, "TEST")
	assert.strictEqual(tokens.rest, "NAME ASDF")
});

QUnit.test( "Node get name", function( assert ) {
	assert.strictEqual(testData.root.children["TEST"].children["NAME"].children["ASDF"].getName().trim(), "TEST NAME ASDF")
});

QUnit.test( "Lookup table search", function( assert ) {
	assert.ok(testData.lookupTable.find(3) !== null)
});

QUnit.test( "Lookup table next index", function( assert ) {
	assert.strictEqual(testData.lookupTable.getNextAvailableIndex(), 4)
});

QUnit.test( "Lookup table insert", function( assert ) {
	var newEntry = new Entry(4, "A", "A")
	var newEntry2 = new Entry(6, "A", "A")
	assert.strictEqual(testData.lookupTable.insert(newEntry), newEntry)
	assert.strictEqual(testData.lookupTable.getNextAvailableIndex(), 5)
	assert.ok(testData.lookupTable.insert(newEntry2) === null)
});

QUnit.test( "Search Name by Codepoint", function( assert ) {
	assert.strictEqual(testData.table.name(942), "GREEK SMALL LETTER ETA WITH TONOS", 'Name for codepoint 942 should be "GREEK SMALL LETTER ETA WITH TONOS"');
});

QUnit.test( "Search Codepoint by Alias", function( assert ) {
	assert.strictEqual(testData.table.character("LATIN SMALL LETTER GHA"), testData.table.character("LATIN SMALL LETTER OI"), 'Codepoint for name "LATIN SMALL LETTER GHA" should be codepoint for name "LATIN SMALL LETTER OI"');
});

QUnit.test( "Search Codepoint by Name", function( assert ) {
	assert.strictEqual(testData.table.character("GREEK SMALL LETTER ETA WITH TONOS"), 942, 'Codepoint for name "GREEK SMALL LETTER ETA WITH TONOS" should be 942');
});

QUnit.test( "Multiple Search Codepoint by Name", function( assert ) {
	assert.strictEqual(testData.table.character("GREEK SMALL LETTER ETA WITH TONOS"), 942, 'Codepoint for name "GREEK SMALL LETTER ETA WITH TONOS" should be 942');
	assert.strictEqual(testData.table.character("LATIN CAPITAL LETTER M"), 77, 'Codepoint for name "GREEK SMALL LETTER ETA WITH TONOS" should be 77');
});

QUnit.test( "Search Major Category by Codepoint", function( assert ) {
	assert.strictEqual(testData.table.majorCategory(942), "L", 'Major Category for codepoint 942 should be "L"');
});

QUnit.test( "Search Category by Codepoint", function( assert ) {
	assert.strictEqual(testData.table.category(942), "Ll", 'Category for codepoint 942 should be "Ll"');
});

QUnit.test( "Search Name that does not exist by Codepoint", function( assert ) {
	assert.strictEqual(testData.table.name(944000000), null, 'Name for codepoint 944000000 should be "null".');
});

QUnit.test( "Search Name that does not exist by Name", function( assert ) {
	assert.strictEqual(testData.table.name("QWERTYUIOPASDFGHJKLZXCVBNM"), null, 'Codepoint for name "QWERTYUIOPASDFGHJKLZXCVBNM" should be "null"');
});

QUnit.test( "Search Major Category that does not exist by Codepoint", function( assert ) {
	assert.strictEqual(testData.table.majorCategory(944000000), null, 'Major Category for codepoint 942000000 should be "null"');
});

QUnit.test( "Search Category that does not exist by Codepoint", function( assert ) {
	assert.strictEqual(testData.table.category(944000000), null, 'Category for codepoint 942000000 should be "null"');	
});

