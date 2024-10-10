export const spellEnchantment = {
    summoning : (spell: string) => (`\n🚀 Summoning the power of ${spell}...`),
    conjuring : (spell: string) => (`📁 Conjuring ${spell} structure...`),
    gathering : (spell: string) => (`📦 Gathering ${spell} dependencies...`),
    complete : (spell: string) => (`🎉 The ${spell} Summoning spell is complete! ✨`),
    error : (spell: string, error: unknown) => (`❌ The ${spell} summoning ritual was interrupted.: ${error.message || error}`),
}
export const creationEnchantmen = {

}