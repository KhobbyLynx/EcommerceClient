import { Ability } from '@casl/ability'
import { initialAbility } from './initialAbility'
import { getUserData } from '../../utility/Utils'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = getUserData()
const existingAbility = userData ? userData.ability : null

export default new Ability(existingAbility || initialAbility)
