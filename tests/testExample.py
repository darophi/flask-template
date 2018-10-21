import unittest

class TestExample(unittest.TestCase):
    def test_add(self):
        self.assertEqual(1+2, 3)

    def test_addFail(self):
        self.assertNotEqual(1+2, 4)