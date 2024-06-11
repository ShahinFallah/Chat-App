import redis from '../redis';

export const findParticipantsInCache = async (key : string, key2 : string) => {
    const firstPersonRaw : string[] = await redis.smembers(key);
    const secondPersonRaw : string[] = await redis.smembers(key2);

    const firstPersonCache = firstPersonRaw.map((person : string) => JSON.parse(person));
    const secondPersonCache = secondPersonRaw.map((person : string) => JSON.parse(person));

    return {firstPersonCache, secondPersonCache};
}