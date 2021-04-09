import clone from 'clone';

/**
 * @function copyApply
 * @param  {type} target An object which will be used as a base.
 * @param  {type} sources An object from which properties will be copied to target with replacement.
 * @return {type} New object with applied change. target and source remain immutable.
 */
export function copyApply(target, sources) {
    const cp = clone(target);
    return sources ? Object.assign(cp, sources) : cp;
}