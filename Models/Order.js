let Status = {
	OnHold: {
		Value: 1,
		Description: 'On hold'
	},
	BeingPrepared: {
		Value: 2,
		Description: 'Being prepared'
	},
	Cancelled: {
		Value: 3,
		Description: 'Cancelled'
	},
	Received: {
		Value: 4,
		Description: 'Received'
	}
};

let orders = [
	{
		id: 1,
		date: '31/10/2019',
		total: '$ 150.00',
		status: Status.OnHold
	},
	{
		id: 2,
		date: '22/04/2020',
		total: '$ 300',
		status: Status.BeingPrepared
	},
	{
		id: 3,
		date: '03/02/2020',
		total: '$ 600',
		status: Status.Cancelled
	},
	{
		id: 4,
		date: '07/04/2020',
		total: '$ 154',
		status: Status.Received
	},
	{
		id: 5,
		date: '07/03/2020',
		total: '$ 222',
		status: Status.Received
	},	
];

module.exports = {
	orders: orders,
	statusEnums: Status
};