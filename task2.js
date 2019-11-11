let AdminUsername = ''
let AdminPassword = '';

/**
 * Considering User is MongoDB schema and all other packages are imported
 * 
 */

let register = async function(){
        let user = await User.findOne({});
        let data ;
        // To check if User exists in Users DB
        if (user) { 
            // To check if User exists in Directory DB
         data = await checkUserInDirectoryDB(user);
        } 
        else{
            let keypair = await Enrolment.enrollUser(AdminUsername, AdminPassword);
            let creds = await  GPG.generateKeypair();
            const tempUser = new User({
                name: 'Some Name',
                identity: {
                    type: creds['type'],
                    certificate: creds['certificate'],
                    private_key: creds['privateKey'],
                    public_key: creds['publicKey']
                },
                keypair: {
                    private_key: keypair.privateKey,
                    public_key: keypair.publicKey
                }
            });

            let saveduser = await tempUser.save();
            data = { user:saveduser, is_registered: false }

        }
        let {user,is_registered } = data;
        if(is_registered === false){
            await Directory.createUser(user);
            let updatedUser = await User.findOneAndUpdate({ _id: user._id }, {
                                    _id: user._id,
                                    name: user.name,
                                }, {
                                    upsert: true,
                                    setDefaultsOnInsert: true,
                                    useFindAndModify: false
                                });

                                return updatedUser;


        }
        else{
            return user;
        }

   
}

const checkUserInDirectoryDB = function(user){
    return new Promise((resolve,reject) => {
        Directory.getUser(user, user.id).then(() => {
            resolve({ user, is_registered: true });
        }).catch(err => {
            if (err.message.indexOf('does not exist') > -1) {
                resolve({ user, is_registered: false });
            }
        });
    })
}



