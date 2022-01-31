export default class thesisService {
    static async thesises(group_name) {
        return fetch(`/backend/thesis/thesises.php?group_name=${group_name}`)
            .then((data) => data.json());
		}
		
		static async thesis(thesis_id) {
			return fetch(`/backend/thesis/thesis.php?id=${thesis_id}`)
				.then((data) => data.json());
		}
}