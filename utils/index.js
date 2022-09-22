const {Ability, AbilityBuilder} =  require('@casl/ability')

function getToken(req) {
    let token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : null
    return token
}

// Policy
const policies = {
    guest(user, { can }) {
        can('read', 'Product')
    },
    user(user, { can }) {
        can('view', 'Order');
        can('create', 'Order');
        can('create', 'Product');
        can('read', 'Order', { user_id: user._id });
        can('update', 'User', { _id: user._id });
        can('read', 'Cart', { user_id: user._id });
        can('update', 'Cart', { user_id: user._id });
        can('view', 'DeliveryAddress');
        can('create', 'DeliveryAddress', {user_id: user._id});
        can('update', 'DeliveryAddress', {user_id: user._id});
        can('delete', 'DeliveryAddress', {user_id: user._id});
        can('read', 'Invoice', {user_id: user._id});
        can('create', 'Tag');
        can('create', 'Category');
        can('update', 'Category');
        can('update', 'Tag'); 
    },
    admin(user, {can}){
        can('manage', 'all')
    }
}

const policyFor = user => {
    let builder = new AbilityBuilder()
    if(user && typeof policies[user.role] === 'function') {
        policies[user.role](user,builder);
    }else{
        policies['guest'](user,builder)
    }
    return new Ability(builder.rules)
}

module.exports =  {getToken, policyFor} 