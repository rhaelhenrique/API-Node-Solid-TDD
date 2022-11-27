import { Challenge } from './../../domain/entities/challenge';
import { Student } from './../../domain/entities/student';
import { InMemoryStudentsRepository } from './../../../tests/repositories/in-memory-students-repositories';
import { InMemoryChallengesRepository } from '../../../tests/repositories/in-memory-challenges-repositories';
import { CreateChallengeSubmission } from './create-challenge-submission';

describe('Create challenge submission use case', () => {
    it('should be able to create a new challenge submission', async () => {
        const studentsRepository = new InMemoryStudentsRepository();
        const challengesRepository = new InMemoryChallengesRepository();

        const student = Student.create({
            name: 'Rhael',
            email: 'test@test.com',
        })

        const challenge = Challenge.create({
            tittle: 'Challenge 01',
            intructionsUrl: 'https://example.com/'
        })

        studentsRepository.items.push(student);
        challengesRepository.items.push(challenge);

        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengesRepository
        );

        const response = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id,
        })

        expect(response).toBeTruthy()
    });
});